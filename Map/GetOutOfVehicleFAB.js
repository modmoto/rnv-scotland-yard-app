import React from 'react';
import {StyleSheet} from "react-native";
import ActionButton from 'react-native-action-button';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScaledSheet, verticalScale} from "react-native-size-matters";


export default function GetOutOfVehicleFAB({onItemPressed}) {
    return (
        <ActionButton offsetY={verticalScale(77)}
                      icon={<Icon name="sign-out" style={styles.actionButtonIcon}/>}
                      buttonColor="rgba(100, 100, 100,1)"
                      onPress={onItemPressed}>
        </ActionButton>
    )
}

const styles = ScaledSheet.create({
    actionButtonIcon: {
        fontSize: '25@vs',
        height: '25@vs',
        left: 2,
        color: 'white',
        zIndex: 11
    }
});

GetOutOfVehicleFAB.propTypes = {
    onItemPressed: PropTypes.func.isRequired
};