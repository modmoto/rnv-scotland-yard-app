import Icon from 'react-native-vector-icons/FontAwesome';
import {ScaledSheet} from "react-native-size-matters";
import {View} from "react-native";
import React from 'react';
import COLORS from "../StyledComponents/Colors";


export default function MrxMarker() {
    return (
        <View>
            <Icon name="user-secret" style={styles.actionButtonIcon}/>
            <Icon name="circle" style={[styles.backDrop]}/>
        </View>
    )
}

const styles = ScaledSheet.create({
    actionButtonIcon: {
        fontSize: '30@vs',
        height: '30@vs',
        color: COLORS.MrXColor(),
        bottom:'30@vs',
        zIndex: 11
    },
    backDrop: {
        position: 'absolute',
        fontSize: '35@vs',
        height: '30@vs',
        bottom:'30@vs',
        color: COLORS.BackDropColor(),
        zIndex: 9
    }
});