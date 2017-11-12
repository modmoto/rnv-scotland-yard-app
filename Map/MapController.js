import React from 'react';
import {View, StyleSheet, Platform} from "react-native";
import {Constants, Location, Permissions} from 'expo';
import {MapView} from "expo";
import {fetchStations} from "../Backend/RestAdapter";

export default class MapController extends React.Component {
    static navigationOptions = ({
            header: null
        }
    );

    constructor(props) {
        super(props);

        this.state = {
            region: null,
            stations: []
        }
    }

    onRegionChange(region) {
        this.setState({region: region});
    }

    async componentDidMount() {
        let location = await this._getLocationAsync();
        this.setState({
            region: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }
        });
    }

    async componentDidUpdate(previousProps, previousState) {
        const {region} = this.state;
        if (region && previousState.region !== region) {
            let stations = await fetchStations(region, 1000);
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
                         onRegionChange={() => this.onRegionChange}
                >
                    {this.state.stations.map(station => (
                        <MapView.Marker
                            coordinate={station.geoLocation}
                            title={station.name}
                        />
                    ))}
                </MapView>
            </View>
        )
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
