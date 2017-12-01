import React from 'react';
import PropTypes from 'prop-types';
import Button from "../../StyledComponents/Button";
import DialogComponent from "react-native-dialog-component/src/DialogComponent";
import DialogContent from "react-native-dialog-component/src/components/DialogContent";
import {ScaleAnimation} from "react-native-dialog-component";

export default function GameFinishedDialog({onOkButtonPressed, reference, playerWinningName}) {
    let title = 'Mrx wurde geschnappt! ' + playerWinningName + ' hat sich um die Sicherheit dieser Stadt verdient gemacht!';
    return (
        <DialogComponent title={title} ref={reference}
                         animationDuration={200}
                         ScaleAnimation={new ScaleAnimation()}>
            <DialogContent>
                <Button title={'Verlasse Spiel'} onPress={() => onOkButtonPressed()}/>
            </DialogContent>
        </DialogComponent>

    )
}

GameFinishedDialog.propTypes = {
    onOkButtonPressed: PropTypes.func.isRequired,
    reference: PropTypes.func.isRequired,
    playerWinningName: PropTypes.string.isRequired,
};