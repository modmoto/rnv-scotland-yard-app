import React from 'react';
import PropTypes from 'prop-types';
import DefaultDialog from "../StyledComponents/DefaultDialog";
import Button from "../StyledComponents/Button";

export default function LeaveActiveSessionDialog({reference, onClickYes}) {
    return (
        <DefaultDialog
            title={'Du bist schon in einem anderen Spiel. Möchtest du das Spiel wirklich wechseln und all deinen Fortschritt in dem anderen Spiel löschen?'}
            reference={reference}>
            <Button title={'Ja'} onPress={() => {
                onClickYes()
            }}/>
        </DefaultDialog>
    )
}

LeaveActiveSessionDialog.propTypes = {
    reference: PropTypes.func.isRequired,
    onClickYes: PropTypes.func.isRequired,
};