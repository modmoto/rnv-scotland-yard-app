import React from 'react';
import {StyleSheet} from "react-native";
import ActionButton from 'react-native-action-button';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function GetOutOfVehicleFAB({onItemPressed}) {
    return (
        <ActionButton icon={<Icon name="sign-out" style={styles.actionButtonIcon}/>}
                      buttonColor="rgba(100, 100, 100,1)"
                      onPress={onItemPressed}>
        </ActionButton>
    )
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 25,
        height: 25,
        left: 2,
        color: 'white',
        zIndex: 11
    }
});

GetOutOfVehicleFAB.propTypes = {
    onItemPressed: PropTypes.func.isRequired
};