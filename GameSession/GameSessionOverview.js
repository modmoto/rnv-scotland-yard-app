import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, View} from "react-native";
import {ScaledSheet, verticalScale} from "react-native-size-matters";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class GameSessionOverviewListElement extends React.Component {
    render() {
        const {gameSession, navigation} = this.props;
        return (

            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('GameSessionJoinPage', {
                gameSession: gameSession
            })}>
                <Text style={styles.gameName}>{gameSession.name}</Text>
                <MrxSummary mrX={gameSession.mrXId}/>
                <Text style={styles.distance}>1400 m</Text>
                <Text
                    style={styles.policeSummary}>{gameSession.policeOfficerIds.length}/{gameSession.maxPoliceOfficers} Police
                    Officers</Text>
            </TouchableOpacity>
        )
    }
}

function MrXActiveIcon() {
    return (
        <Icon name="user-secret" size={verticalScale(20)} color="#000000"/>)
}

function MrXInActiveIcon() {
    return (
        <Icon name="user-secret" size={verticalScale(20)} color="#bbbbbb"/>)
}

function MrxSummary({mrX}) {
    return (
        <View style={styles.mrxSummary}>{mrX ? <MrXActiveIcon/> : <MrXInActiveIcon/>}</View>)
}

GameSessionOverviewListElement.propTypes = {
    gameSession: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};


const styles = ScaledSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#fff',
        padding: '15@s',
        margin: '15@s',
        marginTop: '15@vs',
        marginBottom: '0@vs',
        borderRadius: '15@s',
        borderWidth: '1.50@s',
        borderColor: '#d6d7da',
        justifyContent: 'center',
        alignItems: 'center'
    }, gameName: {
        fontSize: '20@vs',
    }, mrxSummary: {
        width: '33.33%'
    }, policeSummary: {
        width: '33.33%'
    }, distance: {
        width: '33.33%'
    }
});



