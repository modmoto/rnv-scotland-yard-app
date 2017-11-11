import React from 'react';
import {StyleSheet, Text, View} from "react-native";

export default class GameSessionDetailPage extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.gameSessionTransfer.name,
    });

    render() {
        const { gameSessionTransfer: gameSession } = this.props.navigation.state.params;
        return (
            <Text>{gameSession.id}</Text>
        );
    }
}
