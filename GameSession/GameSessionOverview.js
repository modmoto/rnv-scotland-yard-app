import React from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, View} from "react-native";

export default class GameSessionOverview extends React.Component {
    render() {
        const { gameSession, navigate} = this.props;
        return (

        <View style={styles.container}>
            <Text>{gameSession.name}</Text>
            <Text>{gameSession.mrXId ? 1 : 0}/1 MrX</Text>
            <Text>{gameSession.policeOfficerIds.length}/6 Police Officers</Text>
            <Button
                onPress={() => navigate('GameSessionDetails', { gameSession: gameSession })}
                title="Go to details"
            />
        </View>
    )}
}

GameSessionOverview.propTypes = {
    gameSession: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 5
    },
});

