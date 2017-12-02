import React from 'react';
import PropTypes from 'prop-types';
import SelectStationDialog from "./SelectStationDialog/SelectStationDialog";

export default function StartMovementDialog({onStationPressed, onRefresh, reference, playerDrivingType}) {
    const title = 'Wo möchtest du mit dem ' + playerDrivingType + ' einsteigen?';
    return (
        <SelectStationDialog title={title} onStationPressed={onStationPressed} onRefresh={onRefresh} reference={reference}/>
    )
}

StartMovementDialog.propTypes = {
    onStationPressed: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    reference: PropTypes.func.isRequired,
    playerDrivingType: PropTypes.string.isRequired,
};