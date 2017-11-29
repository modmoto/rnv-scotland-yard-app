import React from 'react';
import {View, StyleSheet, ActivityIndicator} from "react-native";
import {MapView} from "expo";
import {fetchGameSession, fetchMrX, fetchPoliceOfficers, fetchStations, postPlayerMove} from "../Backend/RestAdapter";
import TicketBuyFAB from "./TicketBuyFAB";
import DialogManager, {ScaleAnimation} from 'react-native-dialog-component';
import SelectStationDialog from "./SelectStationDialog";
import GetOutOfVehicleFAB from "./GetOutOfVehicleFAB";
import {getLocationAsync} from "../Location/LocationHelpers";
import BottomButtonBar from "./BottomButtonBar";
import GameSessionOverviewListScreen from "../GameSession/GameSessionOverviewListScreen";
import GameFinishedDialog from "./GameFinishedDialog";
import {NavigationActions} from "react-navigation";
import MrxStationsDialog from "./MrxStationsDialog";
import {ScaledSheet} from "react-native-size-matters";
import MrxMarker from "./MrxMarker";
import PoliceMarker from "./PoliceMarker";

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
            region: null
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
            this.openGameFinishedDialog(gameSessionUpdated.gameSessionWinner, gameSessionUpdated.playerWinningName);
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
        const {playerIsInVehicle, playerDrivingType, markersMapped} = this.state;

        return (
            <View style={styles.container}>
                <MapView ref="map"
                         style={styles.map}
                         onRegionChange={() => this.onRegionChange}>
                    {markersMapped}
                </MapView>

                {(playerIsInVehicle) ? <GetOutOfVehicleFAB
                        currentMovement={playerDrivingType}
                        onItemPressed={() => this.openCompleteMovementDialog()}/> :
                    <TicketBuyFAB onItemPressed={(item) => this.openMovementDialogFor(item)}/>}
                <BottomButtonBar onItemPressed={(item) => this.handleBottomMenuClicks(item)}/>
            </View>
        )
    }

    mapMapElementsAsMarkers() {
        const {mrX, policeOfficers, stations} = this.state;

        let stationsMapped = this.mapStationssAsMarkers(stations);

        let markersMapped = this.mapOfficersAsMarkers(policeOfficers);
        if (mrX) {
            let mrxMapped = this.mapMrXAsMarker(mrX);

            markersMapped = markersMapped.concat(mrxMapped).concat(stationsMapped);
            return markersMapped;
        }

        return markersMapped.concat(stationsMapped);
    }

    mapMrXAsMarker(mrX) {
        let marker =
            <MapView.Marker
                key={mrX.id}
                coordinate={mrX.lastKnownLocation.geoLocation}
                title={mrX.lastKnownLocation.name}
            >
                <MrxMarker />
            </MapView.Marker>;

        return [marker];
    }

    mapOfficersAsMarkers(policeOfficers) {
        return policeOfficers
            .map((policeOfficer, index) => (
                <MapView.Marker
                    key={policeOfficer.id}
                    coordinate={policeOfficer.currentLocation.geoLocation}
                    title={policeOfficer.name}
                    description={policeOfficer.currentLocation.name}
                >
                    <PoliceMarker index={index} />
                </MapView.Marker>
            ));
    }

    mapStationssAsMarkers(stations) {
        return stations.map(station => {
                let stationImage;
                if (station.type === 'Taxi') stationImage = require('../assets/taxiPin.png');
                if (station.type === 'Bus') stationImage = require('../assets/busPin.png');
                if (station.type === 'Metro') stationImage = require('../assets/metroPin.png');

                return (<MapView.Marker
                    key={station.stationId}
                    coordinate={station.geoLocation}
                    title={station.name}
                    description={station.type}
                    image={stationImage}
                />);
            }
        );
    }

    async openMovementDialogFor(type) {
        DialogManager.show({
            title: 'Suche aus, wo du mit dem ' + type + ' einsteigen willst:',
            titleAlign: 'center',
            animationDuration: 200,
            ScaleAnimation: new ScaleAnimation(),
            children: (
                <SelectStationDialog onRefresh={() => this.getStationsNearToPlayer(type)}
                                     onStationPressed={(station) => this.startStationSelected(station, type)}
                />
            ),
        }, () => {
        });
    }

    startStationSelected(station, type) {
        this.setState({
            playerIsInVehicle: true,
            playerDrivingType: type,
        });

        DialogManager.dismiss(() => {
        });
    }

    async endStationSelected(station) {
        DialogManager.dismiss(() => {
        });
        DialogManager.show({
            title: 'Sende Bewegung...',
            titleAlign: 'center',
            animationDuration: 200,
            dismissOnTouchOutside: false,
            ScaleAnimation: new ScaleAnimation(),
            children: (
                <ActivityIndicator/>
            ),
        }, () => {
        });

        const {playerDrivingType, player, gameSession} = this.state;
        this.setState({
            playerIsInVehicle: false,
        });

        let move = {
            StationId: station.stationId,
            VehicleType: playerDrivingType
        };

        await postPlayerMove(gameSession.id, player.id, move);
        DialogManager.dismiss(() => {
        });
        await this.updateMapState();
    }

    openCompleteMovementDialog() {
        const {playerDrivingType} = this.state;
        DialogManager.show({
            title: 'Suche aus, wo du das ' + playerDrivingType + ' verlässt',
            titleAlign: 'center',
            animationDuration: 200,
            dismissOnTouchOutside: false,
            ScaleAnimation: new ScaleAnimation(),
            children: (
                <SelectStationDialog onRefresh={() => this.getStationsNearToPlayer()}
                                     onStationPressed={(station) => this.endStationSelected(station)}
                />
            ),
        }, () => {
        });
    }

    openGameFinishedDialog(gameSessionWinner, playerWinningName) {
        DialogManager.show({
            title: 'Spiel beendet finished! ' + playerWinningName + ' als ' + gameSessionWinner + ' hat gewonnen!',
            titleAlign: 'center',
            animationDuration: 200,
            ScaleAnimation: new ScaleAnimation(),
            children: (
                <GameFinishedDialog onOkButtonPressed={() => this.navigateToHomeScreenAfterFinishingGame()}/>
            ),
        }, () => {
        });
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
        DialogManager.dismiss(() => {
        });
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
