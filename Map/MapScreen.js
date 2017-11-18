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

        let playersMapped = this.mapPlayersAsMarkers();

        this.setState({
            markersMapped: playersMapped
        });
    }

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

    mapPlayersAsMarkers() {
        const {mrX, policeOfficers} = this.state;

        let markersMapped = policeOfficers
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
            let mrxMapped = [<MapView.Marker
                key={mrX.id}
                pinColor={'#222222'}
                coordinate={mrX.lastKnownLocation.geoLocation}
                title={mrX.lastKnownLocation.name}
            />];

            markersMapped = markersMapped.concat(mrxMapped);
        }

        return markersMapped;
    }

    mapStationssAsMarkers() {
        const {stations} = this.state;

        return stations.map(station => (
            <MapView.Marker
                key={station.id}
                coordinate={station.geoLocation}
                title={station.name}
            />
        ));
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
