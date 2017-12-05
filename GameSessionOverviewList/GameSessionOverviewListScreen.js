import React from 'react';
import {FlatList, RefreshControl, Text, View} from "react-native";
import PropTypes from 'prop-types';
import GameSessionOverview from "./GameSessionOverview";
import {fetchGameSession, fetchGameSessions} from "../Backend/RestAdapter";
import CreateFab from "./CreateFab";
import {getGameState} from "../Backend/ScotlandYardStorage";
import {ScaledSheet} from "react-native-size-matters";

export default class GameSessionOverviewListScreen extends React.Component {
    static navigationOptions = () => ({
        title: 'Spiele der letzten 24S Stunden',
    });

    constructor(props) {
        super(props);

        this.state = {
            gameSessions: [],
            refreshing: false,
            currentSession: null
        };
    }

    async _onRefresh() {
        this.setState({refreshing: true});
        const gameState = await getGameState();
        this.setState({ ...gameState});
        await this.loadGameSessions();
        this.setState({refreshing: false});
    }

    render() {
        const {currentSession} = this.state;
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                {(currentSession) &&
                <View style={styles.lastSessionContainer}>
                    <Text style={styles.lastSessionContainerLabel}>Aktuelles Spiel:</Text>
                    <GameSessionOverview gameSession={currentSession} navigation={navigation} navigationGoal={'MapScreen'}/>
                </View>
                }
                {(currentSession) && <Text style={styles.lastSessionContainerLabel}>Spiele in deiner Nähe:</Text>}

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
        return <GameSessionOverview gameSession={item} navigation={navigation} navigationGoal={'GameSessionJoinPage'}/>
    };

    _keyExtractor = (item, index) => item.id;

    async componentDidMount() {
        await this._onRefresh();
    }

    async loadGameSessions() {
        const {gameSessionId} = this.state;
        const sessions = await fetchGameSessions();
        if (gameSessionId) {
            const currentSession = await fetchGameSession(gameSessionId);
            this.setState({
                currentSession: currentSession
            })
        }
        this.setState({
            gameSessions: sessions
        })
    }
}

GameSessionOverviewListScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = ScaledSheet.create({
    container: {
        flex: 1
    }, lastSessionContainer: {
        marginBottom: '20@vs',
    }, lastSessionContainerLabel: {
        fontSize: '20@vs',
        marginTop: '12@vs',
        left: '30@s',
    }
});
