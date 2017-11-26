import React from 'react';
import {FlatList, ScrollView, Text, View} from "react-native";
import {fetchMrX, fetchPoliceOfficers} from "../Backend/RestAdapter";
import {NavigationActions} from 'react-navigation'
import Button from "../StyledComponents/Button";
import {ScaledSheet, verticalScale} from "react-native-size-matters";
import Icon from 'react-native-vector-icons/FontAwesome';

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
            <ScrollView>
                <MrxOverview MrX={MrX}/>
                <FlatList style={styles.container}
                          data={policeOfficers}
                          keyExtractor={this._keyExtractor}
                          renderItem={this._renderItem}
                />
                <Button title={'Start Game'} onPress={() => this.navigateToMapController()}/>
            </ScrollView>
        );
    }

    navigateToMapController() {
        const {gameSession, player} = this.props.navigation.state.params;
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

    _renderItem = ({item}) => {
        return <PoliceOfficerOverview policeOfficer={item}/>
    };

    _keyExtractor = (item, index) => item.id;
}


function PoliceOfficerOverview({policeOfficer}) {
    let backgroundColor = {
        backgroundColor: '#0044bb',
    };

    return (
        <View style={[styles.policeOfficerCotainer, backgroundColor]}>
            <Text style={styles.PoliceOfficerLabel}>Police Officer</Text>
            <View style={styles.smallContainer}>
                <Text style={styles.MrxName}>{policeOfficer.name}</Text>
                <Icon name="user-circle-o" size={verticalScale(30)} color="#ccc"/>
            </View>
        </View>
    )
}

function MrxOverview({MrX}) {
    let backgroundColor = {
        backgroundColor: '#333',
    };

    return (
        <View style={[styles.container, backgroundColor]}>
            <View style={styles.mrxCotainer}>
                <Text style={styles.MrxLabel}>MrX:</Text>
                <View style={styles.smallContainer}>
                    <Text style={styles.MrxName}>{MrX.name}</Text>
                    <Icon name="user-secret" size={verticalScale(30)} color="#ccc"/>
                </View>
            </View>
        </View>
    )
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
    },
    MrxName: {
        fontSize: '20@vs',
        color: '#ccc',
    },
    mrxCotainer: {
        padding: '20@vs',
        paddingBottom: '15@vs',
    },
    policeOfficerCotainer: {
        padding: '20@vs',
        paddingBottom: '15@vs',
    },
    MrxLabel: {
        fontSize: '10@vs',
        color: '#ccc',
    },
    PoliceOfficerLabel: {
        fontSize: '10@vs',
    },
    smallContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }

});
