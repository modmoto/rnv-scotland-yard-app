import React from 'react';
import {StackNavigator} from 'react-navigation';
import GameSessionDetailPage from "./GameSession/GameSessionDetailPage";
import GameSessionJoinPage from "./GameSession/GameSessionJoinPage";
import MapPage from "./Map/MapPage";
import GameSessionOverviewListPage from "./GameSession/GameSessionOverviewListPage";

const RootNavigator = StackNavigator({
    GameSessionOverviewPage: {
        screen: GameSessionOverviewListPage,
    },
    GameSessionDetailPage: {
        screen: GameSessionDetailPage,
    },
    GameSessionJoinPage: {
        screen: GameSessionJoinPage,
    },
    MapPage: {
        screen: MapPage,
    },
});

export default RootNavigator;
