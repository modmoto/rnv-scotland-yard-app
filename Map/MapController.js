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
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
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
                            {this.mergeStationsAndPlayers().map(location =>
                                <MapView.Marker pinColor={location.pinColor}
                                                coordinate={location.coordinate}
                                                title={location.title}
                                />)}
                </MapView>
            </View>
        )
    }

    mergeStationsAndPlayers() {
        const {stations, mrX, policeOfficers} = this.state;

        let stationMarkers = stations.map(station => (
            <MapView.Marker pinColor={'#aaaa00'}
                            coordinate={station.geoLocation}
                            title={station.name}
            />
        ));
        let officersWithLocation = policeOfficers.filter(policeOfficer => policeOfficer.currentLocation);
        let policeOfficerMarkers = officersWithLocation.map((policeOfficer) => {
                return <MapView.Marker pinColor={'#0044bb'}
                                coordinate={policeOfficer.currentLocation.geoLocation}
                                title={policeOfficer.name}
                />}
        );
        if (mrX) {
            let mrXMarkers = [
            <MapView.Marker pinColor={'#222222'}
                            coordinate={mrX.lastKnownLocation.geoLocation}
                            title={mrX.LastKnownLocation.name}
            />];
            let concatenatedList = stationMarkers.concat(policeOfficerMarkers).concat(mrxMarkers);
            return concatenatedList;
        }
        let concatenatedList = stationMarkers.concat(policeOfficerMarkers);
        return concatenatedList;
    }

    _keyExtractor = (item, index) => item.id;
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
