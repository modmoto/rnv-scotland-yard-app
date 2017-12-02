import COLORS from "../StyledComponents/Colors";
import {verticalScale} from "react-native-size-matters/lib/scalingUtils";
import {View, Text} from "react-native";
import {ScaledSheet} from "react-native-size-matters";
import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PoliceOfficerOverview({policeOfficer, index}) {
    let backgroundColor = {
        backgroundColor: COLORS.playerColors()[index],
    };

    return (
        <View style={[styles.policeOfficerContainer, backgroundColor]}>
            <Text style={styles.PoliceOfficerLabel}>Police Officer</Text>
            <View style={styles.smallContainer}>
                <Text style={styles.PoliceOfficerName}>{policeOfficer.name}</Text>
                <Icon name="user-circle-o" size={verticalScale(30)} color={COLORS.IconColor()}/>
            </View>
        </View>
    )
}

const styles = ScaledSheet.create({
    PoliceOfficerName: {
        fontSize: '20@vs',
    },
    policeOfficerContainer: {
        padding: '20@vs',
        paddingBottom: '15@vs',
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