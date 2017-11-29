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
            <Icon name="circle" style={[styles.backDrop]}/>
            <Icon name="user-circle-o" style={[styles.actionButtonIcon, bg]}/>
        </View>
    )
}

const styles = ScaledSheet.create({
    actionButtonIcon: {
        fontSize: '30@vs',
        height: '30@vs',
        bottom:'30@vs',
    },
    backDrop: {
        position: 'absolute',
        fontSize: '35@vs',
        height: '30@vs',
        bottom:'30@vs',
        color: COLORS.BackDropColor(),
    }
});