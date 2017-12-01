import React from 'react';
import {ActivityIndicator, FlatList, RefreshControl, Text, View} from "react-native";
import DialogContent from "react-native-dialog-component/src/components/DialogContent";
import PropTypes from 'prop-types';
import StationOverview from "./StationOverview";
import {ScaleAnimation} from "react-native-dialog-component";
import DialogComponent from "react-native-dialog-component/src/DialogComponent";
import DialogManager from "react-native-dialog-component";

export default class SelectStationDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            selectableStations: []
        }
    }

    async componentDidMount() {
        await this._onRefresh();
    }

    render() {
        const {selectableStations, refreshing} = this.state;
        const {title, reference} = this.props;
        return (
            <DialogComponent title={title} ref={reference}
                             animationDuration={200}
                             ScaleAnimation={new ScaleAnimation()}>
                <DialogContent>
                    <View>
                        {refreshing ? <ActivityIndicator/> :
                            <FlatList
                                refreshControl={<RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={() => this._onRefresh()}
                                />}
                                data={selectableStations}
                                keyExtractor={this.keyExtractor}
                                renderItem={this.renderListItem}
                            />}
                    </View>
                </DialogContent>
            </DialogComponent>
        )
    }

    async _onRefresh() {
        this.setState({refreshing: true});
        let stations = await this.props.onRefresh();
        this.setState({selectableStations: stations});
        this.setState({refreshing: false});
    }

    renderListItem = ({item}) => {
        const {onStationPressed} = this.props;
        return <StationOverview station={item} onPressed={(item) => onStationPressed(item)}/>;
    };

    keyExtractor = (item, index) => item.stationId;
}


SelectStationDialog.propTypes = {
    onStationPressed: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    reference: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};