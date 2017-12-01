import React from 'react';
import {View, ActivityIndicator, Text} from "react-native";
import {MapView} from "expo";
import {fetchGameSession, fetchMrX, fetchPoliceOfficers, fetchStations, postPlayerMove} from "../Backend/RestAdapter";
import TicketBuyFAB from "./FAB/TicketBuyFAB";
import DialogManager, {ScaleAnimation} from 'react-native-dialog-component';
import GetOutOfVehicleFAB from "./FAB/GetOutOfVehicleFAB";
import {getLocationAsync} from "../Location/LocationHelpers";
import BottomButtonBar from "./BottomButtonBar";
import GameSessionOverviewListScreen from "../GameSession/GameSessionOverviewListScreen";
import GameFinishedDialog from "./Dialog/GameFinishedDialog";
import {NavigationActions} from "react-navigation";
import MrxStationsDialog from "./Dialog/MrxStationsDialog";
import {ScaledSheet} from "react-native-size-matters";
import MrxMarker from "./Marker/MrxMarker";
import PoliceMarker from "./Marker/PoliceMarker";
import StationMarker from "./Marker/StationMarker";
import CompleteMovementDialog from "./Dialog/CompleteMovementDialog";
import StartMovementDialog from "./Dialog/StartMovementDialog";
import SendingMovementDialog from "./Dialog/SendingMovementDialog";

export default class MapScreen extends React.Component {
    static navigationOptions = ({
            header: null
        }
    );

    constructor(props) {
        super(props);
        const {gameSession, player} = this.props.navigation.state.params;
        this.state = {
            player: player,
            gameSession: gameSession,
            stations: [],
            mrX: null,
            policeOfficers: [],
            markersMapped: [],
            region: null,
            playerWinningName: '',
            playerDrivingType: ''
        }
    }

    onRegionChange(region) {
        this.setState({region: region});
    }

    async componentDidMount() {
        await this.updateMapState();
    }

    async updateMapState() {
        const {player, gameSession} = this.state;

        let gameSessionUpdated = await fetchGameSession(gameSession.id);

        if (gameSessionUpdated.gameSessionWinner !== 'None') {
            this.setState({
                playerWinningName: gameSessionUpdated.playerWinningName
            });
            this.gameFinishedDialog.show();
            return;
        }

        let mrX = await fetchMrX(gameSession.id);
        let policeOfficers = await fetchPoliceOfficers(gameSession.id);

        this.setState({
            mrX: mrX,
            policeOfficers: policeOfficers,
            player: {
                ...player
            }
        });

        this.updateMapMarkers();

        this.refs.map.fitToElements(true);
    }

    updateMapMarkers() {
        let playersMapped = this.mapMapElementsAsMarkers();

        this.setState({
            markersMapped: playersMapped
        });
    }

    render() {
        const {playerIsInVehicle, playerDrivingType, markersMapped, playerWinningName} = this.state;

        return (
            <View style={styles.container}>
                <MapView ref="map"
                         style={styles.map}
                         onRegionChange={() => this.onRegionChange}>
                    {markersMapped}
                </MapView>

                {(playerIsInVehicle) ? <GetOutOfVehicleFAB
                        currentMovement={playerDrivingType}
                        onItemPressed={() => this.completeMovementDialog.show()}/> :
                    <TicketBuyFAB onItemPressed={(item) => {this.playerSelectedDrivingType(item); this.startMovementDialog.show()}}/>}
                <BottomButtonBar onItemPressed={(item) => this.handleBottomMenuClicks(item)}/>

                <GameFinishedDialog playerWinningName={playerWinningName} onOkButtonPressed={() => this.navigateToHomeScreenAfterFinishingGame()}
                    reference={(gameFinishedDialog) => { this.gameFinishedDialog = gameFinishedDialog; }}
                />

                <CompleteMovementDialog onRefresh={() => this.getStationsNearToPlayer()}
                                        onStationPressed={(station) => this.endStationSelected(station)}
                                        reference={(completeMovementDialog) => { this.completeMovementDialog = completeMovementDialog; }}
                />

                <StartMovementDialog onRefresh={() => this.getStationsNearToPlayer()}
                                     onStationPressed={() => this.playerSelectedStartStation()}
                                     playerDrivingType={playerDrivingType}
                                     reference={(startMovementDialog) => { this.startMovementDialog = startMovementDialog; }}
                />
                
                <SendingMovementDialog reference={(sendingMovementDialog) => { this.sendingMovementDialog = sendingMovementDialog; }}/>
            </View>
        )
    }

    mapMapElementsAsMarkers() {
        const {mrX, policeOfficers, stations} = this.state;

        let stationsMapped = stations.map(station => <StationMarker station={station}/>);
        let markersMapped = policeOfficers
            .map((policeOfficer, index) => (
                <PoliceMarker key={policeOfficer.id} policeOfficer={policeOfficer} index={index}/>
            ));
        if (mrX) {
            let mrxMapped = [<MrxMarker key={mrX.id} mrX={mrX}/>];

            markersMapped = markersMapped.concat(mrxMapped).concat(stationsMapped);
            return markersMapped;
        }

        return markersMapped.concat(stationsMapped);
    }

    playerSelectedDrivingType(type) {
        this.setState({
            playerDrivingType: type,
        });
    }

    playerSelectedStartStation() {
        this.setState({
            playerIsInVehicle: true,
        });
        this.startMovementDialog.dismiss();
    }

    async endStationSelected(station) {
        const {playerDrivingType, player, gameSession} = this.state;

        this.completeMovementDialog.dismiss();
        this.sendingMovementDialog.show();
        this.setState({ playerIsInVehicle: false });

        let move = {
            StationId: station.stationId,
            VehicleType: playerDrivingType
        };

        await postPlayerMove(gameSession.id, player.id, move);

        this.sendingMovementDialog.dismiss();
        await this.updateMapState();
    }

    async getStationsNearToPlayer(type) {
        let playerLocation = await getLocationAsync();
        const stationsFetched = await fetchStations(playerLocation.coords, 700);
        if (type) return this.filterStations(stationsFetched, type);
        else return stationsFetched;
    }

    filterStations(stationsFetched, type) {
        if (type === 'Taxi') return stationsFetched;
        if (type === 'Bus') {
            return stationsFetched.filter(station => station.type === 'Bus' || station.type === 'Metro');
        }
        if (type === 'Metro') {
            return stationsFetched.filter(station => station.type === 'Metro');
        }
    }

    async handleBottomMenuClicks(item) {
        switch (item) {
            case 'ShowStations':
                await this.toggleStations();
                break;
            case 'MrX':
                await this.showMrXMoves();
                break;
            case 'LeaveSession':
                this.props.navigation.navigate('GameSessionOverviewListScreen');
                break;
            case 'Refresh':
                await this.updateMapState();
                break;
            default:
        }
    }

    navigateToHomeScreenAfterFinishingGame() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'GameSessionOverviewListScreen'})
            ]
        });

        this.props.navigation.dispatch(resetAction);
    }

    async toggleStations() {
        const {stations} = this.state;
        if (stations.length === 0) {
            let playerLocation = await getLocationAsync();
            // TODO do this 2000 somehow better
            let stationsFetched = await fetchStations(playerLocation.coords, 2000);
            this.setState({
                stations: stationsFetched
            });
        } else {
            this.setState({
                stations: []
            });
        }

        this.updateMapMarkers();
    }

    async showMrXMoves() {
        DialogManager.show({
            title: 'Mrx Bewegungen',
            titleAlign: 'center',
            animationDuration: 200,
            ScaleAnimation: new ScaleAnimation(),
            children: (
                <MrxStationsDialog onRefresh={() => this.getMrX()}
                />
            ),
        }, () => {
        });
    }

    async getMrX() {
        const {gameSession} = this.state;
        return await fetchMrX(gameSession.id);
    }
}

const styles = ScaledSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});
