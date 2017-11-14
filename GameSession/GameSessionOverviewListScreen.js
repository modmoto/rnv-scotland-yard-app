import React from 'react';
import {FlatList} from "react-native";
import PropTypes from 'prop-types';
import GameSessionOverview from "./GameSessionOverview";
import {fetchGameSessions} from "../Backend/RestAdapter";

export default class GameSessionOverviewListScreen extends React.Component {
    static navigationOptions = () => ({
        title: 'Game sessions',
    });

    constructor(props) {
        super(props);

        this.state = {
            gameSessions: []
        };
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

    _renderItem = ({item}) => {
        const { navigation } = this.props;
        return <GameSessionOverview gameSession={item} navigation={navigation}/>
    };

    _keyExtractor = (item, index) => item.id;

    async componentDidMount() {
        let sessions = await fetchGameSessions();
        this.setState({
            gameSessions: sessions
        })
    }
}

GameSessionOverviewListScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};
