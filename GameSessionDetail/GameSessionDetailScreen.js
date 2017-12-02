import React from 'react';
import {FlatList, ScrollView, View, AsyncStorage} from "react-native";
import {fetchMrX, fetchPoliceOfficers} from "../Backend/RestAdapter";
import {NavigationActions} from 'react-navigation'
import Button from "../StyledComponents/Button";
import {ScaledSheet} from "react-native-size-matters";
import MrxOverview from "./MrXOverview";
import PoliceOfficerOverview from "./PoliceOfficerOverview";

export default class GameSessionDetailScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.gameSession.name || 'Kein Name vorhanden',
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
            <ScrollView>
                <View style={styles.container}>
                    <MrxOverview MrX={MrX}/>
                </View>
                <FlatList style={styles.container}
                          data={policeOfficers}
                          keyExtractor={this._keyExtractor}
                          renderItem={this._renderItem}
                />
                <Button title={'Spiel beitreten'} onPress={() => this.navigateToMapController()}/>
            </ScrollView>
        );
    }

    async navigateToMapController() {
        const {gameSession} = this.props.navigation.state.params;
        const {response} = await AsyncStorage.getItem('gameState');
        const player = await (response);
        if (player) {
            console.log('jeah');
        }
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'MapScreen',
                    params: {
                        gameSession: gameSession,
                        player: player
                    }
                })
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

    _renderItem = ({item, index}) => {
        return <PoliceOfficerOverview index={index} policeOfficer={item}/>
    };

    _keyExtractor = (item, index) => item.id;
}

const styles = ScaledSheet.create({
    container: {
        margin: '15@s',
        marginTop: '15@vs',
        marginBottom: '0@vs',
        borderRadius: '10@s',
        borderWidth: '1.50@s',
        borderColor: '#d6d7da',
        overflow: 'hidden'
    }
});
