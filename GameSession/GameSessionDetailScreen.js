import React from 'react';
import {FlatList, Text, View} from "react-native";
import {fetchMrX, fetchPoliceOfficers} from "../Backend/RestAdapter";
import { NavigationActions } from 'react-navigation'
import Button from "../StyledComponents/Button";

export default class GameSessionDetailScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.gameSession.name,
    });

    constructor(props) {
        super(props);

        this.state = {
            policeOfficers: [],
            MrX: {name: '-'}
        }
    }

    render() {
        const {policeOfficers, MrX} = this.state;
        return (
            <View>
                <Text>MrX:</Text>
                <Text>{MrX.name}</Text>
                <Text>Police Officers:</Text>
                <FlatList data={policeOfficers}
                          keyExtractor={this._keyExtractor}
                          renderItem={this._renderItem}
                />
                <Button title={'Start Game'} onPress={() => this.navigateToMapController()}/>
            </View>
        );
    }

    navigateToMapController() {
        const {gameSession, player} = this.props.navigation.state.params;
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'MapScreen' ,
                    params: {
                        gameSession: gameSession,
                        player: player
                }})
            ]
        });

        this.props.navigation.dispatch(resetAction)
    }

    async componentDidMount() {
        const {gameSession} = this.props.navigation.state.params;
        let officers = await fetchPoliceOfficers(gameSession.id);
        let mrX = await fetchMrX(gameSession.id);
        this.setState({
            policeOfficers: officers,
            MrX: mrX
        })
    }

    _renderItem = ({item}) => {
        return <Text>{item.name}</Text>
    };

    _keyExtractor = (item, index) => item.id;
}
