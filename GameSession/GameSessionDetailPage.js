import React from 'react';
import {Button, FlatList, Text, View} from "react-native";
import {fetchMrX, fetchPoliceOfficers} from "../Backend/RestAdapter";

export default class GameSessionDetailPage extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.gameSession.name,
    });

    constructor(props) {
        super(props);

        this.state = {
            policeOfficers: [],
            MrX: {name: '-'}
        }
    }


    render() {
        const { policeOfficers, MrX } = this.state;
        return (
            <View>
                <Text>MrX:</Text>
                <Text>{MrX.name}</Text>
                <Text>Police Officers:</Text>
                <FlatList data={policeOfficers}
                          keyExtractor={this._keyExtractor}
                          renderItem={this._renderItem}
                />
                <Button title={'Start Game'} onPress={() => {}}/>
            </View>
        );
    }

    async componentDidMount() {
        const { gameSession } = this.props.navigation.state.params;
        let officers = await fetchPoliceOfficers(gameSession.id);
        let mrX = await fetchMrX(gameSession.id);
        this.setState({
            policeOfficers: officers,
            MrX: mrX
        })
    }

    _renderItem = ({item}) => {
        return <Text>{item.name}</Text>
    };

    _keyExtractor = (item, index) => item.id;
}
