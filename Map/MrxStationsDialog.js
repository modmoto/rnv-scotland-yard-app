import React from 'react';
import {ActivityIndicator, FlatList, RefreshControl, Text, View} from "react-native";
import DialogContent from "react-native-dialog-component/src/components/DialogContent";
import PropTypes from 'prop-types';
import {ScaledSheet} from "react-native-size-matters";
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from "../StyledComponents/Colors";
import {convertVehicleToColor} from "../util";

export default class MrxStationsDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            refreshing: true,
            mrX: null
        }
    }

    async componentDidMount() {
        await this._onRefresh();
    }

    render() {
        const {mrX, refreshing} = this.state;
        return (
            <DialogContent>
                <View>
                    {refreshing ? <ActivityIndicator/> :
                        <FlatList
                            style={styles.container}
                            refreshControl={<RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => this._onRefresh()}
                            />}
                            data={mrX.usedVehicles}
                            keyExtractor={this.keyExtractor}
                            renderItem={this.renderListItem}
                        />}
                </View>
            </DialogContent>
        )
    }

    async _onRefresh() {
        this.setState({refreshing: true});
        let mrX = await this.props.onRefresh();
        this.setState({
            mrX: mrX,
            refreshing: false
        });
    }

    renderListItem = ({item, index}) => {
        return <MovementOverview movement={item} index={index}/>
    };

    keyExtractor = (item, index) => index;
}

function MovementOverview({movement, index}) {

    let iconName = '';
    let backgroundColor = [{backgroundColor: convertVehicleToColor(movement)}];
    if ((index + 1) % 5 === 0) backgroundColor = [backgroundColor, [{borderWidth: '3.50@s', borderColor: '#222'}]];
    if (movement === "Taxi") iconName = 'taxi';
    if (movement === "Bus") iconName = 'bus';
    if (movement === "Metro") iconName = 'train';

    return (
        <View style={[styles.movementOverview, backgroundColor]}>
            <Icon name={iconName}/>
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        marginBottom: '10@vs',
        borderRadius: '15@s',
        borderWidth: '1.50@s',
        borderColor: '#d6d7da'
    },
    movementOverview: {
        paddingTop: '15@vs',
        paddingBottom: '15@vs',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

MrxStationsDialog.propTypes = {
    onRefresh: PropTypes.func.isRequired,
};