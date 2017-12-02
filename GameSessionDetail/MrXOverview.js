import COLORS from "../StyledComponents/Colors";
import {verticalScale} from "react-native-size-matters/lib/scalingUtils";
import {ScaledSheet} from "react-native-size-matters";
import {View, Text} from "react-native";
import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function MrxOverview({MrX}) {
    let backgroundColor = {
        backgroundColor: COLORS.MrXColor(),
    };

    return (
        <View style={[styles.mrxContainer, backgroundColor]}>
            <Text style={styles.MrxLabel}>MrX:</Text>
            <View style={styles.smallContainer}>
                <Text style={styles.MrxName}>{MrX.name}</Text>
                <Icon name="user-secret" size={verticalScale(30)} color={COLORS.IconColor()}/>
            </View>
        </View>
    )
}

const styles = ScaledSheet.create({
    MrxName: {
        fontSize: '20@vs',
        color: '#ccc',
    },
    mrxContainer: {
        padding: '20@vs',
        paddingBottom: '15@vs',
    },
    MrxLabel: {
        fontSize: '10@vs',
        color: '#ccc',
    },
    smallContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});