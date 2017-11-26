import React from 'react';
import ActionButton from 'react-native-action-button';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScaledSheet, verticalScale} from "react-native-size-matters";
import {convertVehicleToColor} from "../util";


export default function GetOutOfVehicleFAB({onItemPressed, currentMovement}) {
    let color = convertVehicleToColor(currentMovement);

    return (
        <ActionButton offsetY={verticalScale(77)}
                      icon={<Icon name="sign-out" style={styles.actionButtonIcon}/>}
                      buttonColor={color}
                      onPress={onItemPressed}>
        </ActionButton>
    )
}

const styles = ScaledSheet.create({
    actionButtonIcon: {
        fontSize: '25@vs',
        height: '25@vs',
        color: 'white',
        zIndex: 11
    }
});

GetOutOfVehicleFAB.propTypes = {
    onItemPressed: PropTypes.func.isRequired,
    currentMovement: PropTypes.string.isRequired
};