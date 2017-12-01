import React from 'react';
import PropTypes from 'prop-types';
import DialogComponent from "react-native-dialog-component/src/DialogComponent";
import {ScaleAnimation} from "react-native-dialog-component";

export default function MrxFullErrorDialog({reference}) {
    return (
        <DialogComponent title={'Mrx ist leider schon besetzt'} ref={reference}
                         animationDuration={200}
                         ScaleAnimation={new ScaleAnimation()}>
        </DialogComponent>
    )
}

MrxFullErrorDialog.propTypes = {
    reference: PropTypes.func.isRequired,
};