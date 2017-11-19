import React from 'react';
import {StyleSheet} from "react-native";
import ActionButton from 'react-native-action-button';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function GetOutOfVehicleFAB({onItemPressed, iconType}) {
    if (iconType === 'Taxi') iconType = 'taxi';
    if (iconType === 'Bus') iconType = 'bus';
    if (iconType === 'Metro') iconType = 'train';

    return (
        <ActionButton icon={<Icon name={iconType} style={styles.actionButtonIcon}/>}
                      buttonColor="rgba(100, 100, 100,1)"
                      onPress={onItemPressed}>
        </ActionButton>
    )
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 25,
        color: 'white',
        zIndex: 11
    }
});

GetOutOfVehicleFAB.propTypes = {
    onItemPressed: PropTypes.func.isRequired,
    iconType: PropTypes.string.isRequired,
};