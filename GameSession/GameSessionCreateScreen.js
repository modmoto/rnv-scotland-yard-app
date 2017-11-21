import React from 'react';
import {Button, FlatList, Text, TextInput, View} from "react-native";
import {postGameSession, postMrX, postPoliceOfficer} from "../Backend/RestAdapter";
import {getLocationAsync} from "../Location/LocationHelpers";

export default class GameSessionCreateScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Create a new Game Session",
    });

    constructor(props) {
        super(props);
        this.state = {
            gameSessionName: '',
            maxPlayers: 4,
        };
    }


    render() {
        const {gameSessionName, maxPlayers} = this.state;

        return (
            <View>
                <Text>Game Session Name:</Text>
                <TextInput
                    onChangeText={(text) => this.setState({gameSessionName: text})}
                    value={gameSessionName}
                />

                <Button title={'Create GameSession'} onPress={() => this.createGameSessionAndNavigateToJoinPage()}/>
            </View>
        );
    }

    async createGameSessionAndNavigateToJoinPage() {
        const {gameSessionName, maxPlayers} = this.state;

        let gameSession = await postGameSession({
            Name: gameSessionName,
            MaxPoliceOfficers: maxPlayers
        });

        this.navigateToJoinPage(gameSession);
    }

    navigateToJoinPage(gameSession) {

        this.props.navigation.navigate('GameSessionJoinPage', {
            gameSession: gameSession
        });
    }
}
