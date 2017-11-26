import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';
import {ScaledSheet} from "react-native-size-matters";


export default function StationOverview({station, onPressed}) {
    return(
        <View>
            <TouchableOpacity style={styles.container} onPress={() => onPressed(station)}>
                <Text style={styles.text}>{station.name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        padding: '15@vs'
    },
    text: {
        fontSize: '18@vs'
    },
});

StationOverview.propTypes = {
    station: PropTypes.object.isRequired,
    onPressed: PropTypes.func.isRequired,
};


