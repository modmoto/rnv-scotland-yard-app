import React from 'react';
import {View} from "react-native";
import {postMrX, postPoliceOfficer} from "../Backend/RestAdapter";
import {getLocationAsync} from "../Location/LocationHelpers";
import Button from "../StyledComponents/Button";
import TextInput from "../StyledComponents/TextInput";
import MrxFullErrorDialog from "./MrxFullErrorDialog";
import PoliceFullErrorDialog from "./PoliceFullErrorDialog";
import {saveGameState} from "../Backend/ScotlandYardStorage";

export default class GameSessionJoinScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.gameSession.name || 'Kein Name vorhanden',
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
                <Button title={'Mr-X'} onPress={() => this.createMrXAndNavigateToDetailPage(playerName)}/>
                <Button title={'Polizist'}
                        onPress={() => this.createPoliceOfficerAndNavigateToDetailPage(playerName)}/>

                <MrxFullErrorDialog reference={(dialog) => this.mrxFullErrorDialog = dialog}/>
                <PoliceFullErrorDialog reference={(dialog) => this.policeFullErrorDialog = dialog}/>
            </View>
        );
    }

    async createPoliceOfficerAndNavigateToDetailPage(playerName) {
        let playerLocation = await getLocationAsync();
        const {gameSession} = this.props.navigation.state.params;
        let officer = await postPoliceOfficer(gameSession.id, {
            name: playerName,
            startLocation: playerLocation.coords
        });
        if (officer === null) {
            this.policeFullErrorDialog.show();
            return;
        }

        await saveGameState(officer, "policeOfficer", gameSession);

        this.navigateToDetailPage();
    }

    async createMrXAndNavigateToDetailPage(playerName) {
        let playerLocation = await getLocationAsync();
        const {gameSession} = this.props.navigation.state.params;
        let mrX = await await postMrX(gameSession.id, {
            name: playerName,
            startLocation: playerLocation.coords
        });
        if (mrX === null) {
            this.mrxFullErrorDialog.show();
            return;
        }

        await saveGameState(mrX, 'mrX', gameSession);

        this.navigateToDetailPage();
    }

    navigateToDetailPage() {
        const {gameSession} = this.props.navigation.state.params;

        this.props.navigation.navigate('GameSessionDetailScreen', {
            gameSession: gameSession,
        });
    }
}
