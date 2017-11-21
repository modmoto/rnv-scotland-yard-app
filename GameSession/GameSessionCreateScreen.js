import React from 'react';
import {Button, FlatList, Picker, Text, TextInput, View} from "react-native";
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
            maxPlayers: '4',
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

                <Text>How Many Police Officer should be playable?</Text>
                <Picker
                    selectedValue={maxPlayers}
                    onValueChange={(itemValue, itemIndex) => this.setState({maxPlayers: itemValue})}>
                    <Picker.Item label="3" value="3"/>
                    <Picker.Item label="4" value="4"/>
                    <Picker.Item label="5" value="5"/>
                    <Picker.Item label="6" value="6"/>
                    <Picker.Item label="7" value="7"/>
                    <Picker.Item label="8" value="8"/>
                </Picker>
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
