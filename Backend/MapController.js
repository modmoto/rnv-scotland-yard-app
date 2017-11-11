import React from 'react';
import {Text, View} from "react-native";

export default class MapController extends React.Component {
    static navigationOptions = ({
            header: null
        }
    );

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>no heade</Text>
            </View>
        )
    }
}
