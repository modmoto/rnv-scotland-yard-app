import React from 'react';
import PropTypes from 'prop-types';
import BottomToolbar from "react-native-bottom-toolbar";
import {ScaledSheet, verticalScale} from "react-native-size-matters";

export default function BottomButtonBar({onItemPressed}) {
    return (
        <BottomToolbar size={verticalScale(20)} font={"font-awesome"} wrapperStyle={styles.bottomBar}>
            <BottomToolbar.Action
                title='GoBack'
                iconName="arrow-left"
                onPress={() => onItemPressed('LeaveSession')}
            />
            <BottomToolbar.Action
                title='ShowStations'
                iconName="map-marker"
                onPress={() => onItemPressed('ShowStations')}
            />
            <BottomToolbar.Action
                title='MrX'
                iconName="user-secret"
                onPress={() => onItemPressed('MrX')}
            />
            <BottomToolbar.Action
                title='Refresh'
                iconName="refresh"
                onPress={() => onItemPressed('Refresh')}
            />
        </BottomToolbar>);
}

BottomButtonBar.propTypes = {
    onItemPressed: PropTypes.func.isRequired,
};

const styles = ScaledSheet.create({
    bottomBar: {
        position: 'absolute',
        height: '50@vs'
    }
});