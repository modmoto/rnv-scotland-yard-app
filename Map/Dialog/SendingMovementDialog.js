import React from 'react';
import PropTypes from 'prop-types';
import Button from "../../StyledComponents/Button";
import DialogComponent from "react-native-dialog-component/src/DialogComponent";
import DialogContent from "react-native-dialog-component/src/components/DialogContent";
import {ScaleAnimation} from "react-native-dialog-component";
import DialogManager from "react-native-dialog-component";
import {ActivityIndicator} from "react-native";

export default function SendingMovementDialog({reference}) {
    return (
        <DialogComponent title={'Sende Bewegung'} ref={reference}
                         animationDuration={200}
                         ScaleAnimation={new ScaleAnimation()}>
            <DialogContent>
                <ActivityIndicator/>
            </DialogContent>
        </DialogComponent>
    )
}

SendingMovementDialog.propTypes = {
    reference: PropTypes.func.isRequired,
};