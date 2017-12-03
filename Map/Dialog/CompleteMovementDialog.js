import React from 'react';
import PropTypes from 'prop-types';
import SelectStationDialog from "./SelectStationDialog/SelectStationDialog";

export default function CompleteMovementDialog({onStationPressed, onRefresh, reference}) {
    const title = "Wo möchtest du aussteigen?";
    return (
        <SelectStationDialog title={title} onStationPressed={onStationPressed} onRefresh={onRefresh} reference={reference}/>
    )
}

CompleteMovementDialog.propTypes = {
    onStationPressed: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    reference: PropTypes.func.isRequired,
};