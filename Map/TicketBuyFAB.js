import React from 'react';
import {StyleSheet} from "react-native";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TicketBuyFAB extends React.Component {


    render() {
        return (
            <ActionButton buttonColor="rgba(200, 200, 200,1)">
                <ActionButton.Item buttonColor='#9b59b6' onPress={() => console.log("notes tapped!")}>
                    <Icon name="train" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#1abc9c' onPress={() => {}}>
                    <Icon name="bus" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#eaf259' onPress={() => {}}>
                    <Icon name="taxi" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        )
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 25,
        color: 'white',
        zIndex: 11
    }
});
