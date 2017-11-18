import React from 'react';
import {View, StyleSheet, Platform, Button} from "react-native";
import {Location, Permissions} from 'expo';
import {MapView} from "expo";
import {fetchMrX, fetchPoliceOfficers, fetchStations} from "../Backend/RestAdapter";
import FloatingActionButton from "./TicketBuyFAB";

export default class MapScreen extends React.Component {
    static navigationOptions = ({
            header: null
        }
    );

    constructor(props) {
        super(props);
        const {gameSession, player} = this.props.navigation.state.params;
        this.state = {
            player: player,
            gameSession: gameSession,
            stations: [],
            mrX: null,
            policeOfficers: [],
            markersMapped: [],
            region: null
        }
    }

    onRegionChange(region) {
        this.setState({region: region});
    }

    async componentDidMount() {
        await this.loadMapElements();

        this.refs.map.fitToElements(true);
    }

    async loadMapElements() {
        const {player, gameSession} = this.state;

        let mrX = await fetchMrX(gameSession.id);
        let policeOfficers = await fetchPoliceOfficers(gameSession.id);

        this.setState({
            mrX: mrX,
            policeOfficers: policeOfficers,
            player: {
                ...player
            }
        });

        this.mapStationsAsMarkers();
    }

    async componentDidUpdate(previousProps, previousState) {
        const {player} = this.state;
        if (player && previousState.player !== player) {
            // TODO do this 10 000 somehow better
            /*let region = player.location;
            let stations = await fetchStations(region, 2000);
            this.setState({
                stations: stations
            });*/
        }
    }

    _getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        return await Location.getCurrentPositionAsync({});
    };

    render() {
        return (
            <View style={styles.container}>
                <MapView ref="map"
                         style={styles.map}
                         onRegionChange={() => this.onRegionChange}>
                    {this.state.markersMapped}
                </MapView>

                <Button title={'Refresh'}
                        onPress={async () => await this.loadMapElements()}/>
                {/*<FloatingActionButton/>*/}
            </View>
        )
    }

    mapStationsAsMarkers() {
        const {stations, mrX, policeOfficers, player} = this.state;

        /*let stationsMapped = stations.map(station => (
            <MapView.Marker
                key={station.id}
                coordinate={station.geoLocation}
                title={station.name}
            />
        ));*/
        let markersMapped = policeOfficers.filter(p => p.currentLocation)
            .map(policeOfficer => (
                <MapView.Marker
                    key={policeOfficer.id}
                    pinColor={'#0044bb'}
                    coordinate={policeOfficer.currentLocation.geoLocation}
                    title={policeOfficer.name}
                    description={policeOfficer.currentLocation.name}
                />
            ));
        if (mrX) {
            if (mrX.lastKnownLocation) {
                let mrxMapped = [<MapView.Marker
                    key={mrX.id}
                    pinColor={'#222222'}
                    coordinate={mrX.lastKnownLocation.geoLocation}
                    title={mrX.lastKnownLocation.name}
                />];

                markersMapped = markersMapped.concat(mrxMapped);
            }
        }

        if (player) {
            if (player.location) {
                let playerMapped = [<MapView.Marker
                    key={"Player_" + player.id}
                    pinColor={'#11bb22'}
                    coordinate={player.location}
                    title="Me"
                />];

                markersMapped = markersMapped.concat(playerMapped);
            }
        }

        this.setState ({
            markersMapped: markersMapped
        });
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1
    },
});