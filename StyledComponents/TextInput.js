import React from 'react';
import PropTypes from 'prop-types';
import {TextInput as TextInputReact} from "react-native";
import {ScaledSheet} from "react-native-size-matters";



export default function TextInput({onChangeText, value, placeholder}) {
    return (
        <TextInputReact
            autoCorrect={false}
            placeholder={placeholder}
            placeholderTextColor={'#ccc'}
            style={styles.textInput}
            onChangeText={(text) => onChangeText(text)}
            value={value}
        />
    )
}


TextInput.propTypes = {
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
};

const styles = ScaledSheet.create({
    textInput: {
        paddingBottom: '10@vs',
        margin: '10@vs',
        marginTop: '30@vs',
        marginLeft: '30@s',
        marginRight: '30@s',
        fontSize: '25@vs',
        textAlign: 'center',
        borderBottomColor: '#999',
        borderBottomWidth: 1.5,
    }
});
