import React from 'react';
import ActionButton from 'react-native-action-button';
import PropTypes from 'prop-types';

export default function CreateFab({onItemPressed}){
    return (
        <ActionButton buttonColor="rgba(200, 200, 200,1)" onPress={onItemPressed}>
        </ActionButton>
    )
}

CreateFab.propTypes = {
    onItemPressed: PropTypes.func.isRequired,
};