import React from 'react';
import {StyleSheet} from "react-native";
import ActionButton from 'react-native-action-button';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomToolbar from "react-native-bottom-toolbar";

export default function BottomButtonBar({onItemPressed}) {
    return (
        <BottomToolbar font="font-awesome" wrapperStyle={styles.bottomBar}>
            <BottomToolbar.Action
                title='GoBack'
                iconName="arrow-left"
                onPress={() => onItemPressed('GoBack')}
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

const styles = StyleSheet.create({
    bottomBar: {
        position: 'absolute',
        height: 50
    }
});