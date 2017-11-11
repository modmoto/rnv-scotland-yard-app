import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from "react-native";

export default function GameSessionOverview({gameSession, onPress}) {
    return (
        <View style={styles.container} onPress={onPress}>
            <Text>{gameSession.name}</Text>
            <Text>{gameSession.mrXId ? 1 : 0}/1 MrX</Text>
            <Text>{gameSession.policeOfficerIds.length}/6 Police Officers</Text>
        </View>
    );
}

GameSessionOverview.propTypes = {
    gameSession: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 5
    },
});

