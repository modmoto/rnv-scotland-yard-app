import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';

export default function StationOverview({station, onPressed}) {
    return(
        <View>
            <TouchableOpacity style={styles.container} onPress={() => onPressed(station)}>
                <Text>{station.name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
});

StationOverview.propTypes = {
    station: PropTypes.object.isRequired,
    onPressed: PropTypes.func.isRequired,
};


