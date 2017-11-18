import React from 'react';
import {FlatList, View} from "react-native";
import DialogContent from "react-native-dialog-component/src/components/DialogContent";
import PropTypes from 'prop-types';
import StationOverview from "./StationOverview";

export default class SelectStationDialog extends React.Component{
    render ()
    {
        const { selectableStations } = this.props;
        return (
            <DialogContent>
                <View>
                    <FlatList
                        data={selectableStations}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderListItem}
                    />
                </View>
            </DialogContent>
        )
    }

    renderListItem = ({item}) => {
        const { onStationPressed } = this.props;
        return <StationOverview station={item} onPressed={onStationPressed}/>;
    };

    keyExtractor = (item, index) => item.id;
}


SelectStationDialog.propTypes = {
    selectableStations: PropTypes.array.isRequired,
    onStationPressed: PropTypes.func.isRequired,
};