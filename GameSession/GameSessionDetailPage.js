import React from 'react';
import {Text} from "react-native";

export default class GameSessionDetailPage extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.gameSession.name,
    });

    render() {
        const { gameSession } = this.props.navigation.state.params;
        return (
            <Text>{gameSession.id}</Text>
        );
    }
}
