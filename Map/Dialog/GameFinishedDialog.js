import React from 'react';
import PropTypes from 'prop-types';
import Button from "../../StyledComponents/Button";
import DefaultDialog from "../../StyledComponents/DefaultDialog";

export default function GameFinishedDialog({onOkButtonPressed, reference, playerWinningName}) {
    let title = 'Mrx wurde geschnappt! ' + playerWinningName + ' hat sich um die Sicherheit dieser Stadt verdient gemacht!';
    return (
        <DefaultDialog title={title} reference={reference}>
            <Button title={'Verlasse Spiel'} onPress={() => onOkButtonPressed()}/>
        </DefaultDialog>
    )
}

GameFinishedDialog.propTypes = {
    onOkButtonPressed: PropTypes.func.isRequired,
    reference: PropTypes.func.isRequired,
    playerWinningName: PropTypes.string.isRequired,
};