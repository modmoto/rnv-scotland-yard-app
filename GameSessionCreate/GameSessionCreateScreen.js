import React from 'react';
import {Picker, Text, View} from "react-native";
import {postGameSession} from "../Backend/RestAdapter";
import Button from "../StyledComponents/Button";
import TextInput from "../StyledComponents/TextInput";
import {ScaledSheet} from "react-native-size-matters";
import StyledActivityIndicator from "../StyledComponents/StyledActivityIndicator";

export default class GameSessionCreateScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "Erstelle ein neues Spiel",
    });

    constructor(props) {
        super(props);
        this.state = {
            gameSessionName: '',
            maxPlayers: '4',
            refreshing: false,
        };
    }


    render() {
        const {gameSessionName, maxPlayers, refreshing} = this.state;

        return (
            <View>
                {(refreshing) ? <StyledActivityIndicator/> :
                    <View>
                        <TextInput
                            placeholder={'Name des Spiels'}
                            onChangeText={(text) => this.setState({gameSessionName: text})}
                            value={gameSessionName}
                        />

                        <Text style={styles.text}>Anzahl Police Officers:</Text>
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
                        <Button title={'Erstelle Spiel'} onPress={() => this.createGameSessionAndNavigateToJoinPage()}/>
                    </View>}
            </View>
        );
    }

    async createGameSessionAndNavigateToJoinPage() {
        const {gameSessionName, maxPlayers} = this.state;

        this.setState({refreshing: true});

        let gameSession = await postGameSession({
            Name: gameSessionName,
            MaxPoliceOfficers: maxPlayers
        });

        this.setState({refreshing: false});

        this.navigateToJoinPage(gameSession);
    }

    navigateToJoinPage(gameSession) {

        this.props.navigation.navigate('GameSessionJoinPage', {
            gameSession: gameSession
        });
    }
}

const styles = ScaledSheet.create({
    text: {
        paddingTop: '30@vs',
        fontSize: '18@vs',
        textAlign: 'center',
    }
});
