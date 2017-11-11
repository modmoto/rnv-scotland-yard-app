import React from 'react';
import {StyleSheet, Text, View} from "react-native";

export default class GameSessionDetailPage extends React.Component {
    render() {
        return (
            <Text>{this.props.gameSession}</Text>
        );
    }
}
