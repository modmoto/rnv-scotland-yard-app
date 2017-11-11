const BackendUrl = 'http://localhost:5000';

function fetchJson(path) {
    const url = `${BackendUrl}${path}`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': '81ef63c8-7d9d-44e3-a06d-328eedd88676'
        }})
        .then(response => response.json())
        .catch(exception =>
            console.error('parsing failed during get', exception));
}

export async function fetchGameSessions() {
    return await fetchJson('/game-sessions');
}

export function sendJson(method, path, body) {
    const url = `${BackendUrl}${path}`;

    return fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
      .catch(exception =>
            console.error('parsing failed during send', exception)
    );
}