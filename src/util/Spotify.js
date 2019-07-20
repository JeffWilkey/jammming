const environment = require('../environment.json');
const spotifyAPIBaseURL = 'https://api.spotify.com/v1'
const clientId = environment.clientId;
const redirectURI = environment.redirectURI;
let accessToken;
let expiresIn;

const Spotify = {
  getAccessToken() {
    const accessTokenInURL = window.location.href.match(/access_token=([^&]*)/);
    const expiryInURL = window.location.href.match(/expires_in=([^&]*)/);
    if (accessToken) {
      return accessToken
    } 
    if (accessTokenInURL && expiryInURL) {
      accessToken = accessTokenInURL[1];
      expiresIn = expiryInURL[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
    }
  },
  search(searchTerm) {
    return fetch(`${spotifyAPIBaseURL}/search?type=track&q=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.tracks.items.length) {
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            URI: track.uri
          }
        })
      }
      return []
    })
  },
  savePlaylist(name, trackURIs) {
    if (!name || !trackURIs || !trackURIs.length || trackURIs.includes(undefined)) return;

    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;
    let playlistId;
    fetch(`${spotifyAPIBaseURL}/me`, { headers })
    .then(response => response.json())
    .then(jsonResponse => userId = jsonResponse.id)
    .then(() => {
      fetch(`${spotifyAPIBaseURL}/users/${userId}/playlists`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ name })
      })
      .then(response => response.json())
      .then(jsonResponse => playlistId = jsonResponse.id)
      .then(() => {
        fetch(`${spotifyAPIBaseURL}/playlists/${playlistId}/tracks`, {
          headers,
          method: 'POST',
          body: JSON.stringify({ uris: trackURIs })
        })
      })
    })
    
  }
}

export default Spotify;