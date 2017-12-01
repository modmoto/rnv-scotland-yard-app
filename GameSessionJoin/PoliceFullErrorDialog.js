import React from 'react';
import PropTypes from 'prop-types';
import DialogComponent from "react-native-dialog-component/src/DialogComponent";
import {ScaleAnimation} from "react-native-dialog-component";

export default function PoliceFullErrorDialog({reference}) {
    return (
        <DialogComponent title={'Keine freien Plätze für Polizisten mehr'} ref={reference}
                         animationDuration={200}
                         ScaleAnimation={new ScaleAnimation()}>
        </DialogComponent>
    )
}

PoliceFullErrorDialog.propTypes = {
    reference: PropTypes.func.isRequired,
};