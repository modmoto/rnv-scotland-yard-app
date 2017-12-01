import React from 'react';
import {ActivityIndicator, FlatList, RefreshControl, Text, View} from "react-native";
import DialogContent from "react-native-dialog-component/src/components/DialogContent";
import PropTypes from 'prop-types';
import StationOverview from "./SelectStationDialog/StationOverview";
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