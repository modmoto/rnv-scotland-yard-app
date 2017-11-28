import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScaledSheet} from "react-native-size-matters";
import {View} from "react-native";
import COLORS from "../StyledComponents/Colors";


export default function PoliceMarker(index) {
    let c = COLORS.playerColors()[index.index];
    let bg = [{
        color: c
    }];

    return (
        <View>
            <Icon name="user-circle-o" style={[styles.actionButtonIcon, bg]}/>
            <Icon name="circle" style={[styles.backDrop]}/>
        </View>
    )
}

const styles = ScaledSheet.create({
    actionButtonIcon: {
        position: 'absolute',
        fontSize: '30@vs',
        height: '30@vs',
        bottom:'30@vs',
        zIndex: 10
    },
    backDrop: {
        position: 'absolute',
        fontSize: '30@vs',
        height: '30@vs',
        bottom:'30@vs',
        color: COLORS.BackDropColor(),
        zIndex: 9
    }
});