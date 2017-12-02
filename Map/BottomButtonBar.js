import React from 'react';
import PropTypes from 'prop-types';
import {ScaledSheet} from "react-native-size-matters";
import {TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from "../StyledComponents/Colors";

export default function BottomButtonBar({onItemPressed}) {
    return (
        <View style={styles.bottomBar}>
            <BottomButton
                iconName="arrow-left"
                onPress={() => onItemPressed('LeaveSession')}
            />
            <BottomButton
                iconName="map-marker"
                onPress={() => onItemPressed('ShowStations')}
            />
            <BottomButton
                iconName="user-secret"
                onPress={() => onItemPressed('MrX')}
            />
            <BottomButton
                iconName="refresh"
                onPress={() => onItemPressed('Refresh')}
            />
        </View>);
}

function BottomButton({iconName, onPress}) {
    return (
        <TouchableOpacity style={styles.button} onPress={() => onPress()}>
            <Icon style={styles.icon} name={iconName}/>
        </TouchableOpacity>
    )
}

BottomButtonBar.propTypes = {
    onItemPressed: PropTypes.func.isRequired,
};

const styles = ScaledSheet.create({
    bottomBar: {
        height: '50@vs',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: COLORS.LightColor()
    }, button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.InactiveColor(),
    }, icon: {
        fontSize: '20@vs',
        color: COLORS.DarkColor()
    }
});