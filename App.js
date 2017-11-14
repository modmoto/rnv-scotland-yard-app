import React from 'react';
import {StackNavigator} from 'react-navigation';
import GameSessionDetailScreen from "./GameSession/GameSessionDetailScreen";
import GameSessionJoinScreen from "./GameSession/GameSessionJoinScreen";
import MapScreen from "./Map/MapPage";
import GameSessionOverviewListScreen from "./GameSession/GameSessionOverviewListScreen";

const RootNavigator = StackNavigator({
    GameSessionOverviewListScreen: {
        screen: GameSessionOverviewListScreen,
    },
    GameSessionDetailPage: {
        screen: GameSessionDetailScreen,
    },
    GameSessionJoinPage: {
        screen: GameSessionJoinScreen,
    },
    MapScreen: {
        screen: MapScreen,
    },
});

export default RootNavigator;
