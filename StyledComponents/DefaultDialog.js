import React from 'react';
import PropTypes from 'prop-types';
import DialogComponent from "react-native-dialog-component/src/DialogComponent";
import DialogContent from "react-native-dialog-component/src/components/DialogContent";
import {ScaleAnimation} from "react-native-dialog-component";

export default function DefaultDialog({children, title, reference, onShown, onDismissed}) {
    return (
        <DialogComponent onShown={() => onShown()} onDismissed={() => onDismissed()} title={title} ref={reference}
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
    onShown: PropTypes.func,
    onDismissed: PropTypes.func,
};