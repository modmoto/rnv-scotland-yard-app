import React from 'react';
import {fetchGameSessions} from "./Backend/RestAdapter";
import GameSessionListController from "./GameSession/GameSessionListController";
import {StackNavigator} from 'react-navigation';
import GameSessionDetailPage from "./GameSession/GameSessionDetailPage";
import GameSessionJoinPage from "./GameSession/GameSessionJoinPage";

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
    GameSessionDetailPage: {
        screen: GameSessionDetailPage,
    },
    GameSessionJoinPage: {
        screen: GameSessionJoinPage,
    },
});

export default RootNavigator;
