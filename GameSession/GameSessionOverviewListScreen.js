import React from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import PropTypes from 'prop-types';
import GameSessionOverview from "./GameSessionOverview";
import {fetchGameSessions} from "../Backend/RestAdapter";
import CreateFab from "./CreateFab";

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
            <View style={styles.container}>
                <FlatList
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
