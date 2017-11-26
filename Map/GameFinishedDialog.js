import React from 'react';
import DialogContent from "react-native-dialog-component/src/components/DialogContent";
import PropTypes from 'prop-types';
import Button from "../StyledComponents/Button";

export default function GameFinishedDialog({onOkButtonPressed}) {
    return (
        <DialogContent>
            <Button title={'Verlasse Spiel'} onPress={() => onOkButtonPressed()}/>
        </DialogContent>
    )
}

GameFinishedDialog.propTypes = {
    onOkButtonPressed: PropTypes.func.isRequired,
};