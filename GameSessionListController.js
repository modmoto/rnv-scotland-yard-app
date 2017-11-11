import React from 'react';
import {FlatList, Text} from "react-native";
import {fetchGameSessions} from "./Backend/GameSessionAdapter";

export default class GameSessionListController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            gameSessions: []
        }

    }

    render() {
        return (
            <FlatList
                data={this.state.gameSessions}
                renderItem={({item: gameSession}) => <Text>{gameSession.name}</Text>}
            />
        );
    }

    async componentDidMount() {
        let sessions = await fetchGameSessions();
        this.setState({
            gameSessions: sessions
        })

    }
}
