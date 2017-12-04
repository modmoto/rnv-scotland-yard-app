import React from 'react';
import {ActivityIndicator} from "react-native";
import {ScaledSheet} from "react-native-size-matters";

export default function StyledActivityIndicator() {
    return (
        <ActivityIndicator size={'large'} style={styles.indicator}/>
    )
}

const styles = ScaledSheet.create({
    indicator: {
        paddingTop: '250@vs'
    }
});
