import React from 'react';
import {View, StyleSheet, Platform} from "react-native";
import {Location, Permissions} from 'expo';
import {MapView} from "expo";
import {fetchMrX, fetchPoliceOfficers, fetchStations} from "../Backend/RestAdapter";
import ActionButton from 'react-native-action-button';
import Icon from "expo/src/Icon";

export default class TicketBuyFAB extends React.Component {


    render() {
        return (
            <View style={styles.container} icon={<Icon name="ticket" style={styles.actionButtonIcon}/>}>
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="New Task"
                                       onPress={() => console.log("notes tapped!")}>
                        <Icon name="ticket" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {
                    }}>
                        <Icon name="car" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {
                    }}>
                        <Icon name="bus" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {
                    }}>
                        <Icon name="train" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                </ActionButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    container: {
        position: 'absolute'
    },
});
