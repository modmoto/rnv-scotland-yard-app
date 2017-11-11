import React from 'react';
import {StyleSheet, View} from 'react-native';
import GameSessionListController from "./GameSessionListController";
import {fetchGameSessions} from "./Backend/RestAdapter";

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
