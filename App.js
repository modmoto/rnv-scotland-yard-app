import React from 'react';
import GameSessionListController from "./GameSession/GameSessionListController";
import {StackNavigator} from 'react-navigation';
import GameSessionDetailPage from "./GameSession/GameSessionDetailPage";
import GameSessionJoinPage from "./GameSession/GameSessionJoinPage";
import MapController from "./Map/MapController";

const RootNavigator = StackNavigator({
    GameSessionListController: {
        screen: GameSessionListController,
    },
    GameSessionDetailPage: {
        screen: GameSessionDetailPage,
    },
    GameSessionJoinPage: {
        screen: GameSessionJoinPage,
    },
    MapController: {
        screen: MapController,
    },
});

export default RootNavigator;
