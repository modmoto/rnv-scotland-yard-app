import React from 'react';
import ActionButton from 'react-native-action-button';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScaledSheet, verticalScale} from "react-native-size-matters";
import COLORS from "../StyledComponents/Colors";


export default function TicketBuyFAB({onItemPressed}){
    return (
        <ActionButton offsetY={verticalScale(77)} icon={ <Icon name="credit-card" style={styles.actionButtonIcon} />}  buttonColor="rgba(200, 200, 200,1)">
            <ActionButton.Item buttonColor={COLORS.stationColors()[2]} onPress={() => onItemPressed("Train")}>
                <Icon name="train" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor={COLORS.stationColors()[1]} onPress={() => onItemPressed("Bus")}>
                <Icon name="bus" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor={COLORS.stationColors()[0]} onPress={() => onItemPressed("Taxi")}>
                <Icon name="taxi" style={styles.actionButtonIcon} />
            </ActionButton.Item>
        </ActionButton>
    )
}

const styles = ScaledSheet.create({
    actionButtonIcon: {
        fontSize: '20@vs',
        height: '25@vs',
        color: 'white',
        zIndex: 11
    }
});

TicketBuyFAB.propTypes = {
    onItemPressed: PropTypes.func.isRequired,
};