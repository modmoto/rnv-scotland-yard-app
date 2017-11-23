import React from 'react';
import DialogContent from "react-native-dialog-component/src/components/DialogContent";
import PropTypes from 'prop-types';
import {Button} from "react-native";

export default function GameFinishedDialog({onOkButtonPressed}) {
    return (
        <DialogContent>
            <Button title={'Leave Game'} onPress={() => onOkButtonPressed()}/>
        </DialogContent>
    )
}

GameFinishedDialog.propTypes = {
    onOkButtonPressed: PropTypes.func.isRequired,
};