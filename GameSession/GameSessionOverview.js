import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default class GameSessionOverview extends React.Component {
    render() {
        const {gameSession, navigation} = this.props;
        return (

            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('GameSessionJoinPage', {
                gameSession: gameSession,
                navigation: navigation
            })}>
                <Text>{gameSession.name}</Text>
                <Text>{gameSession.mrXId ? 1 : 0}/1 MrX</Text>
                <Text>{gameSession.policeOfficerIds.length}/{gameSession.maxPoliceOfficers} Police Officers</Text>
            </TouchableOpacity>
        )
    }
}

GameSessionOverview.propTypes = {
    gameSession: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 5
    },
});

