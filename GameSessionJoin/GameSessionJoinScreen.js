import React from 'react';
import {ActivityIndicator, View} from "react-native";
import {postMrX, postPoliceOfficer} from "../Backend/RestAdapter";
import {getLocationAsync} from "../Location/LocationHelpers";
import Button from "../StyledComponents/Button";
import TextInput from "../StyledComponents/TextInput";
import MrxFullErrorDialog from "./MrxFullErrorDialog";
import PoliceFullErrorDialog from "./PoliceFullErrorDialog";
import {getGameState, saveGameState} from "../Backend/ScotlandYardStorage";
import LeaveActiveSessionDialog from "./LeaveActiveSessionDialog";
import StyledActivityIndicator from "../StyledComponents/StyledActivityIndicator";

export default class GameSessionJoinScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.gameSession.name || 'Kein Name vorhanden',
    });

    constructor(props) {
        super(props);
        this.state = {
            playerName: '',
            playerRole: '',
            playerId: '',
            refreshing: false
        };
    }

    async savePlayerAndGotToMapPage() {
        const {gameSession} = this.props.navigation.state.params;
        const {playerRole, playerName} = this.state;
        this.setState({refreshing: true});

        let playerLocation = await getLocationAsync();
        let player = await this.postPlayer(playerRole, gameSession, playerName, playerLocation);

        if (player === null) {
            if (playerRole === 'mrX') this.mrxFullErrorDialog.show();
            if (playerRole === 'policeOfficer') this.policeFullErrorDialog.show();
            return;
        }

        await saveGameState(player, playerRole, gameSession);

        this.setState({refreshing: false});

        await this.navigateToDetailPage();
    }

    render() {
        const {playerName, refreshing} = this.state;

        return (
            <View>
                {(refreshing) ? <StyledActivityIndicator/> :
                    <View>
                        <TextInput
                            placeholder={'Spielername'}
                            onChangeText={(text) => this.setState({playerName: text})}
                            value={this.state.playerName}
                        />
                        <Button title={'Mr-X'}
                                onPress={() => this.tryCreatePlayerAndNavigateToDetailPage(playerName, 'mrX')}/>
                        <Button title={'Polizist'}
                                onPress={() => this.tryCreatePlayerAndNavigateToDetailPage(playerName, 'policeOfficer')}/>

                        <MrxFullErrorDialog reference={(dialog) => this.mrxFullErrorDialog = dialog}/>
                        <PoliceFullErrorDialog reference={(dialog) => this.policeFullErrorDialog = dialog}/>
                        <LeaveActiveSessionDialog
                            reference={(leaveActiveSessionDialog) => this.leaveActiveSessionDialog = leaveActiveSessionDialog}
                            onClickYes={() => this.savePlayerAndGotToMapPage()}/>
                    </View>
                }
            </View>
        );
    }

    async tryCreatePlayerAndNavigateToDetailPage(playerName, playerRole) {

        const gameState = await getGameState();
        if (gameState) {
            this.leaveActiveSessionDialog.show();

            this.setState({
                playerName: playerName,
                playerRole: playerRole,
            });
            return;
        }

        await this.savePlayerAndGotToMapPage();
    }

    async postPlayer(playerRole, gameSession, playerName, playerLocation) {
        let player = null;
        if (playerRole === 'mrX') {
            player = await await postMrX(gameSession.id, {
                name: playerName,
                startLocation: playerLocation.coords
            });
        }
        if (playerRole === 'policeOfficer') {
            player = await await postPoliceOfficer(gameSession.id, {
                name: playerName,
                startLocation: playerLocation.coords
            });
        }
        return player;
    }

    async navigateToDetailPage() {
        const {gameSession} = this.props.navigation.state.params;

        this.props.navigation.navigate('GameSessionDetailScreen', {
            gameSession: gameSession,
        });
    }
}
