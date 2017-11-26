import React from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from "react-native";
import PropTypes from 'prop-types';
import GameSessionOverview from "./GameSessionOverview";
import {fetchGameSessions} from "../Backend/RestAdapter";
import CreateFab from "./CreateFab";

export default class GameSessionOverviewListScreen extends React.Component {
    static navigationOptions = () => ({
        title: 'Spiele in deiner Umgebung',
    });

    constructor(props) {
        super(props);

        this.state = {
            gameSessions: [],
            refreshing: false,
        };
    }

    async _onRefresh() {
        this.setState({refreshing: true});
        await this.loadGameSessions();
        this.setState({refreshing: false});
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this._onRefresh()}
                        />}
                    data={this.state.gameSessions}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />

                <CreateFab onItemPressed={() => this.props.navigation.navigate('GameSessionCreateScreen')}/>
            </View>
        );
    }

    _renderItem = ({item}) => {
        const {navigation} = this.props;
        return <GameSessionOverview gameSession={item} navigation={navigation}/>
    };

    _keyExtractor = (item, index) => item.id;

    async componentDidMount() {
        await this._onRefresh();
    }

    async loadGameSessions() {
        let sessions = await fetchGameSessions();
        this.setState({
            gameSessions: sessions
        })
    }
}

GameSessionOverviewListScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
});
