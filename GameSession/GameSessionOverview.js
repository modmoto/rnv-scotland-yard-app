import React from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, View} from "react-native";

export default class GameSessionOverview extends React.Component {
    render() {
        const { gameSession, navigation} = this.props;
        return (

        <View style={styles.container}>
            <Text>{gameSession.name}</Text>
            <Text>{gameSession.mrXId ? 1 : 0}/1 MrX</Text>
            <Text>{gameSession.policeOfficerIds.length}/6 Police Officers</Text>
            <Button
                onPress={() => navigation.navigate('GameSessionDetails', { gameSessionTransfer: gameSession })}
                title="Go to details"
            />
        </View>
    )}
}

GameSessionOverview.propTypes = {
    gameSession: PropTypes.object.isRequired,
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 5
    },
});

