const BackendUrl = 'http://localhost:5000';

export async function fetchGameSessions() {
    return await fetchJson('/game-sessions');
}

export async function fetchPoliceOfficers(sessionId) {
    return await fetchJson('/game-sessions/' + sessionId + '/police-officers');
}

export async function fetchMrX(sessionId) {
    return await fetchJson('/game-sessions/' + sessionId + '/mr-x');
}

export async function fetchStations(geoPoint, distance) {
    return await fetchJson(`/stations?Longitude=${geoPoint.longitude}&Latitude=${geoPoint.latitude}&Distance=${distance}`);
}

export async function postMrX(sessionId, mrx) {
    return await sendJson('POST', '/game-sessions/' + sessionId + '/mr-x', mrx);
}

export async function postPoliceOfficer(sessionId, policeOfficer) {
    return await sendJson('POST', '/game-sessions/' + sessionId + '/police-officers', policeOfficer);
}

export async function postPlayerMove(sessionId, playerId, move) {
    return await sendJson('POST', '/game-sessions/' + sessionId + '/players/' + playerId + '/move', move);
}


async function fetchJson(path) {
    const url = `${BackendUrl}${path}`;

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': '81ef63c8-7d9d-44e3-a06d-328eedd88676'
        }});
    let object = await response.json();
    return object;
}

async function sendJson(method, path, body) {
    const url = `${BackendUrl}${path}`;

    let response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': '81ef63c8-7d9d-44e3-a06d-328eedd88676'
        }
    });
    let object = await response.json();
    return object;
}