import Icon from 'react-native-vector-icons/FontAwesome';
import {ScaledSheet} from "react-native-size-matters";
import {View} from "react-native";
import React from 'react';
import COLORS from "../StyledComponents/Colors";
import {MapView} from "expo";



export default function StationMarker({station}) {
    let stationImage;
    if (station.type === 'Taxi') stationImage = require('../assets/taxiPin.png');
    if (station.type === 'Bus') stationImage = require('../assets/busPin.png');
    if (station.type === 'Metro') stationImage = require('../assets/metroPin.png');

    return (<MapView.Marker
        key={station.stationId}
        coordinate={station.geoLocation}
        title={station.name}
        description={station.type}
        image={stationImage}
    />)
}