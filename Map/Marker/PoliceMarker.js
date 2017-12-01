import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScaledSheet} from "react-native-size-matters";
import {View} from "react-native";
import COLORS from "../../StyledComponents/Colors";
import {MapView} from "expo";


export default function PoliceMarker({policeOfficer, index}) {
    let c = COLORS.playerColors()[index];
    let bg = [{
        color: c
    }];

    return (
        <MapView.Marker
            coordinate={policeOfficer.currentLocation.geoLocation}
            title={policeOfficer.name}
            description={policeOfficer.currentLocation.name}
        >
            <View>
                <Icon name="circle" style={[styles.backDrop]}/>
                <Icon name="user-circle-o" style={[styles.actionButtonIcon, bg]}/>
            </View>
        </MapView.Marker>
    )
}

const styles = ScaledSheet.create({
    actionButtonIcon: {
        fontSize: '30@vs',
        height: '30@vs',
        bottom:'30@vs',
    },
    backDrop: {
        position: 'absolute',
        fontSize: '35@vs',
        height: '30@vs',
        bottom:'30@vs',
        color: COLORS.BackDropColor(),
    }
});