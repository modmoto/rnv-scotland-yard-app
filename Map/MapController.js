import React from 'react';
import {View, StyleSheet, Platform} from "react-native";
import {Constants, Location, Permissions} from 'expo';
import {MapView} from "expo";

export default class MapController extends React.Component {
    static navigationOptions = ({
            header: null
        }
    );

    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,

            },
            markers: [
                {
                    title: 'tit',
                    latlng: {
                        latitude: 37.78825,
                        longitude: -122.4324,
                    },
                    description: 'desc'
                }
            ]

        }
    }

    onRegionChange(region) {
        this.setState({region: region});
    }

    async componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            let location = await this._getLocationAsync();

            this.setState({
                region: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                }
            })
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
                    {this.state.markers.map(marker => (
                        <MapView.Marker
                            coordinate={marker.latlng}
                            title={marker.title}
                            description={marker.description}
                        />
                    ))}
                </MapView>
            </View>
        )
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
