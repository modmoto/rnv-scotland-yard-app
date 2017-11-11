import React from 'react';
import {StyleSheet, Text, View} from "react-native";

export default class GameSessionDetailPage extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Chat with ${navigation.state.params.user}`,
    });

    render() {
        return (
            <Text>lololsss{this.props.gameSession}</Text>
        );
    }
}
