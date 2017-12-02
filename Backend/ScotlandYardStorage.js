import {AsyncStorage} from "react-native";

export async function saveGameState(player, playerRole, gameSession) {
    await AsyncStorage.setItem('gameState', JSON.stringify({
        playerRole: playerRole,
        playerId: player.id,
        gameSessionId: gameSession.id
    }));
}

export async function getGameState() {
    const response = await AsyncStorage.getItem('gameState');
    return await JSON.parse(response);
}