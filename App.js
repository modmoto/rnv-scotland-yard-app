import React from 'react';
import {StackNavigator} from 'react-navigation';
import GameSessionDetailScreen from "./GameSession/GameSessionDetailScreen";
import GameSessionJoinScreen from "./GameSessionJoin/GameSessionJoinScreen";
import MapScreen from "./Map/MapScreen";
import GameSessionOverviewListScreen from "./GameSession/GameSessionOverviewListScreen";
import GameSessionCreateScreen from "./GameSession/GameSessionCreateScreen";

const RootNavigator = StackNavigator({
    GameSessionOverviewListScreen: {
        screen: GameSessionOverviewListScreen,
    },
    GameSessionDetailScreen: {
        screen: GameSessionDetailScreen,
    },
    GameSessionCreateScreen: {
        screen: GameSessionCreateScreen,
    },
    GameSessionJoinPage: {
        screen: GameSessionJoinScreen,
    },
    MapScreen: {
        screen: MapScreen,
    },
});

export default RootNavigator;
