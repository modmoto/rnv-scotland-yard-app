import React from 'react';
import {StyleSheet, View} from 'react-native';
import {fetchGameSessions} from "./Backend/RestAdapter";
import GameSessionListController from "./GameSession/GameSessionListController";

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <GameSessionListController fetchGameSessions={fetchGameSessions}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30
    },
});
