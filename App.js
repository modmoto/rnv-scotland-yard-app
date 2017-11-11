import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {fetchGameSessions} from "./Backend/RestAdapter";
import GameSessionListController from "./GameSession/GameSessionListController";
import {StackNavigator} from 'react-navigation';
import GameSessionDetailPage from "./GameSession/GameSessionDetailPage";

const HomeScreen = ({navigation}) => (
        <GameSessionListController fetchGameSessions={fetchGameSessions} navigation={navigation}/>
);

const RootNavigator = StackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            headerTitle: 'Available Games',
        },
    },
    GameSessionDetails: {
        screen: GameSessionDetailPage,
    },
});

export default RootNavigator;
