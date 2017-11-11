import React from 'react';
import {Button, FlatList, Text, TextInput, View} from "react-native";
import {postMrX, postPoliceOfficer} from "../Backend/RestAdapter";

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

        return (
            <View>
                <Text>What is your name?</Text>
                <TextInput
                    onChangeText={(text) => this.setState({playerName: text})}
                    value={this.state.playerName}
                />
                <Text>What do you want to play?</Text>
                <Button title={'MrX'} onPress={() => this.createMrXAndNavigateToDetailPage(playerName)}/>
                <Button title={'Police Officer'}
                        onPress={() => this.createPoliceOfficerAndNavigateToDetailPage(playerName)}/>
            </View>
        );
    }

    async createPoliceOfficerAndNavigateToDetailPage(playerName) {
        await postPoliceOfficer(this.props.navigation.state.params.gameSession.id, {name: playerName});
        this.navigateToDetailPage();
    }

    async createMrXAndNavigateToDetailPage(playerName) {
        await postMrX(this.props.navigation.state.params.gameSession.id, {name: playerName});
        this.navigateToDetailPage();
    }

    navigateToDetailPage() {
        const {navigation, gameSession} = this.props.navigation.state.params;

        navigation.navigate('GameSessionDetailPage', {
            gameSession: gameSession,
            navigation: navigation
        });
    }
}
