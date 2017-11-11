import React from 'react';
import {FlatList, Text} from "react-native";
import PropTypes from 'prop-types';
import GameSessionOverview from "./GameSessionOverview";

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
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }

    _renderItem = ({item}) => (
        <GameSessionOverview gameSession={item} onPress={this.props.navigateToGameSession}/>
    );

    _keyExtractor = (item, index) => item.id;


    async componentDidMount() {
        let sessions = await this.props.fetchGameSessions();
        this.setState({
            gameSessions: sessions
        })

    }
}

GameSessionListController.propTypes = {
    fetchGameSessions: PropTypes.func.isRequired,
    navigateToGameSession: PropTypes.func.isRequired,
};
