import React from 'react';
import {Text, View} from "react-native";
import PropTypes from 'prop-types';

export default function StationOverview({station}) {
    return(
        <View>
            <Text>{station.name}</Text>
        </View>
    )
}

StationOverview.propTypes = {
    station: PropTypes.object.isRequired,
};


