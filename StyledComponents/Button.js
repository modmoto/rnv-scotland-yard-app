import React from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet, TouchableOpacity} from "react-native";
import {ScaledSheet} from "react-native-size-matters";



export default function Button({title, onPress, color}) {
    const backGroundColor = {
        backgroundColor: color
    };

    return (
        <TouchableOpacity style={[styles.container, backGroundColor]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    color: PropTypes.string,
};

Button.defaultProps = {
    color: '#fff'
};

const styles = ScaledSheet.create({
    container: {
        padding: '15@s',
        paddingBottom: '18@vs',
        margin: '15@s',
        marginTop: '15@vs',
        marginBottom: '0@vs',
        borderRadius: '10@s',
        borderWidth: '1.50@s',
        borderColor: '#d6d7da',
        alignItems: 'center',
    },text: {
        fontSize: '20@vs'
    }
});
