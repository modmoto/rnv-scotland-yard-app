import React from 'react';
import {View, StyleSheet, Platform} from "react-native";
import {Constants, Location, Permissions} from 'expo';
import {MapView} from "expo";
import {fetchMrX, fetchPoliceOfficers, fetchStations} from "../Backend/RestAdapter";

export default class MapController extends React.Component {
    static navigationOptions = ({
            header: null
        }
    );

    constructor(props) {
        super(props);

        this.state = {
            region: null,
            stations: [],
            mrX: null,
            policeOfficers: []
        }
    }

    onRegionChange(region) {
        this.setState({region: region});
    }

    async componentDidMount() {
        const {gameSession} = this.props.navigation.state.params;

        let location = await this._getLocationAsync();
        let mrX = await fetchMrX(gameSession.id);
        let policeOfficers = await fetchPoliceOfficers(gameSession.id);

        this.setState({
            region: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0122,
                longitudeDelta: 0.0071
            },
            mrX: mrX,
            policeOfficers: policeOfficers
        });
    }

    async componentDidUpdate(previousProps, previousState) {
        const {region} = this.state;
        if (region && previousState.region !== region) {
            // TODO do this 10 000 somehow better
            let stations = await fetchStations(region, 10000);
            this.setState({
                stations: stations
            });
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
                <MapView style={styles.map}
                         region={this.state.region}
                         onRegionChange={() => this.onRegionChange}>
                            {this.getStationsAsMarker()}
                </MapView>
            </View>
        )
    }

    getStationsAsMarker() {
        const {stations, mrX, policeOfficers} = this.state;

        let stationsMapped = stations.map(station => (
            <MapView.Marker
                key={station.id}
                coordinate={station.geoLocation}
                title={station.name}
            />
        ));
        let policeOfficersMapped = policeOfficers.filter(p => p.currentLocation)
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

                return policeOfficersMapped.concat(mrxMapped).concat(stationsMapped);
            }
        }
        return policeOfficersMapped.concat(stationsMapped);
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
    },
});
