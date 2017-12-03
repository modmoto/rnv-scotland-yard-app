import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator} from "react-native";
import DefaultDialog from "../../StyledComponents/DefaultDialog";

export default function SendingMovementDialog({reference}) {
    return (
        <DefaultDialog title={'Sende Bewegung'} reference={reference}>
            <ActivityIndicator/>
        </DefaultDialog>
    )
}

SendingMovementDialog.propTypes = {
    reference: PropTypes.func.isRequired,
};