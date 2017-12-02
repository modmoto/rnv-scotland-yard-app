import React from 'react';
import {StackNavigator} from 'react-navigation';
import GameSessionDetailScreen from "./GameSessionDetail/GameSessionDetailScreen";
import GameSessionJoinScreen from "./GameSessionJoin/GameSessionJoinScreen";
import MapScreen from "./Map/MapScreen";
import GameSessionOverviewListScreen from "./GameSessionOverviewList/GameSessionOverviewListScreen";
import GameSessionCreateScreen from "./GameSessionCreate/GameSessionCreateScreen";

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
