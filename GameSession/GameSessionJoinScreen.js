import React from 'react';
import {View} from "react-native";
import {postMrX, postPoliceOfficer} from "../Backend/RestAdapter";
import {getLocationAsync} from "../Location/LocationHelpers";
import Button from "../StyledComponents/Button";
import TextInput from "../StyledComponents/TextInput";

export default class GameSessionJoinScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.gameSession.name,
    });

    constructor(props) {
        super(props);
        this.state = {
            playerName: '',
            playerRole: '',
            playerId: ''
        };
    }

    render() {
        const {playerName} = this.state;

        return (
            <View>
                <TextInput
                    placeholder={'Spielername'}
                    onChangeText={(text) => this.setState({playerName: text})}
                    value={this.state.playerName}
                />
                <Button title={'MrX'} onPress={() => this.createMrXAndNavigateToDetailPage(playerName)}/>
                <Button title={'Police Officer'}
                        onPress={() => this.createPoliceOfficerAndNavigateToDetailPage(playerName)}/>
            </View>
        );
    }

    async createPoliceOfficerAndNavigateToDetailPage(playerName) {
        let playerLocation = await getLocationAsync();
        let officer = await postPoliceOfficer(this.props.navigation.state.params.gameSession.id, {
            name: playerName,
            startLocation: playerLocation.coords
        });
        this.setState({
            playerRole: 'mrX',
            playerId: officer.id
        });
        this.navigateToDetailPage();
    }

    async createMrXAndNavigateToDetailPage(playerName) {
        let playerLocation = await getLocationAsync();
        let mrX = await await postMrX(this.props.navigation.state.params.gameSession.id, {
            name: playerName,
            startLocation: playerLocation.coords
        });
        this.setState({
            playerRole: 'mrX',
            playerId: mrX.id
        });
        this.navigateToDetailPage();
    }

    navigateToDetailPage() {
        const {gameSession} = this.props.navigation.state.params;
        const {playerId, playerRole} = this.state;

        this.props.navigation.navigate('GameSessionDetailScreen', {
            gameSession: gameSession,
            player: {
                id: playerId,
                playerRole: playerRole
            }
        });
    }
}
