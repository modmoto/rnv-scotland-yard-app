import React from 'react';
import ActionButton from 'react-native-action-button';
import PropTypes from 'prop-types';
import COLORS from "../StyledComponents/Colors";

export default function CreateFab({onItemPressed}){
    return (
        <ActionButton buttonColor={COLORS.LightColor()} onPress={onItemPressed}>
        </ActionButton>
    )
}

CreateFab.propTypes = {
    onItemPressed: PropTypes.func.isRequired,
};