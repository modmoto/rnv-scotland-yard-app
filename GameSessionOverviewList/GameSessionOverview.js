import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, View} from "react-native";
import {ScaledSheet, verticalScale} from "react-native-size-matters";
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from "../StyledComponents/Colors";

export default class GameSessionOverviewListElement extends React.Component {
    render() {
        const {gameSession, navigation} = this.props;
        return (

            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('GameSessionJoinPage', {
                gameSession: gameSession
            })}>
                <Text style={styles.gameName}>{gameSession.name}</Text>
                <View style={styles.details}>
                    <MrxSummary mrX={gameSession.mrXId}/>
                    <Text style={styles.distance}>1400 m</Text>
                    <PoliceSummary officers={gameSession.policeOfficerIds} maxOfficers={gameSession.maxPoliceOfficers}/>
                </View>
            </TouchableOpacity>
        )
    }
}

function MrXActiveIcon() {
    return (
        <Icon name="user-secret" size={verticalScale(20)} color={COLORS.MrXColor()}/>)
}

function MrXInActiveIcon() {
    return (
        <Icon name="user-secret" size={verticalScale(20)} color={COLORS.InactiveColor()}/>)
}

function PoliceOfficerActiveIcon({index}) {
    return (
        <Icon key={index} name="user-circle-o" size={verticalScale(20)} color={COLORS.playerColors()[index]}/>)
}

function PoliceOfficerInActiveIcon() {
    return (
        <Icon name="user-circle-o" size={verticalScale(20)} color={COLORS.InactiveColor()}/>)
}

function MrxSummary({mrX}) {
    return (
        <View style={styles.mrxSummary}>{mrX ? <MrXActiveIcon/> : <MrXInActiveIcon/>}</View>)
}

function PoliceSummary({officers, maxOfficers}) {
    let officerIcons = [];
    for (i = 0; i < maxOfficers; i++) {
        if (officers[i]) {
            officerIcons[i] = <PoliceOfficerActiveIcon key={i} index={i}/>
        } else {
            officerIcons[i] = <PoliceOfficerInActiveIcon key={i}/>
        }
    }
    return (
        <View style={styles.policeSummary}>{officerIcons}</View>)
}

GameSessionOverviewListElement.propTypes = {
    gameSession: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};


const styles = ScaledSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: '15@s',
        paddingBottom: '18@vs',
        margin: '15@s',
        marginTop: '15@vs',
        marginBottom: '0@vs',
        borderRadius: '15@s',
        borderWidth: '1.50@s',
        borderColor: '#d6d7da',
        height: '102@vs'
    }, gameName: {
        fontSize: '20@vs',
    }, details: {
        flex: 1,
        paddingTop: '10@vs',
        paddingLeft: '10@s',
        paddingRight: '10@s',
        paddingBottom: '0@vs',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    }, mrxSummary: {
    }, policeSummary: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    }, distance: {
        fontSize: '10@vs',
        color: '#888',
        bottom:0
    }
});



