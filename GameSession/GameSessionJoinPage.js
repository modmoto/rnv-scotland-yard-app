import React from 'react';
import {Button, FlatList, Text, TextInput, View} from "react-native";

export default class GameSessionJoinPage extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.gameSession.name,
    });

    constructor(props) {
        super(props);
        this.state = {playerName: ''};
    }


    render() {
        const {playerName} = this.state;
        const {navigation, gameSession} = this.props.navigation.state.params;

        return (
            <View>
                <Text>What is your name?</Text>
                <TextInput
                    onChangeText={(text) => this.setState({playerName: text})}
                    value={this.state.playerName}
                />
                <Text>What do you want to play?</Text>
                <Button title={'MrX'} onPress={() => navigation.navigate('GameSessionDetailPage', {
                    name: playerName,
                    gameSession: gameSession
                })}/>
                <Button title={'Police Officer'}
                        onPress={() => navigation.navigate('GameSessionDetailPage', {
                            name: playerName,
                            gameSession: gameSession
                        })}/>
            </View>
        );
    }
}
