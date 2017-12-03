import React from 'react';
import PropTypes from 'prop-types';
import DialogComponent from "react-native-dialog-component/src/DialogComponent";
import DialogContent from "react-native-dialog-component/src/components/DialogContent";
import {ScaleAnimation} from "react-native-dialog-component";

export default function DefaultDialog({children, title, reference}) {
    return (
        <DialogComponent title={title} ref={reference}
                         animationDuration={200}
                         ScaleAnimation={new ScaleAnimation()}>
            <DialogContent>
                {children}
            </DialogContent>
        </DialogComponent>

    )
}

DefaultDialog.propTypes = {
    title: PropTypes.string.isRequired,
    reference: PropTypes.func.isRequired,
};