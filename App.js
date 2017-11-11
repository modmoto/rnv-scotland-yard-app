import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {fetchGameSessions} from "./Backend/RestAdapter";
import GameSessionListController from "./GameSession/GameSessionListController";
import { StackNavigator } from 'react-navigation';

const HomeScreen = ({ navigation }) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
            onPress={() => navigation.navigate('Details')}
            title="Go to details"
        />
        <GameSessionListController fetchGameSessions={fetchGameSessions} navigateToGameSession={() => navigation}/>
    </View>
);

const DetailsScreen = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
    </View>
);

const RootNavigator = StackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            headerTitle: 'Available Games',
        },
    },
    Details: {
        screen: DetailsScreen,
        navigationOptions: {
            headerTitle: 'Details',
        },
    },
});

export default RootNavigator;
