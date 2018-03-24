const client_id = 'd6e496b588e148f4a8f711962e2f15cc';
const redirect_uri = 'http://localhost:3000/';

let accessToken = '';

const Spotify = {
  getAccessToken(){
    if(accessToken){ //Check if the user's access token is already set. If it is, return the value saved to access token.
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch){ //check the URL to see if accessToken has just been obtained
      /*
      Set the access token value
      Set a variable for expiration time
      Set the access token to expire at the value for expiration time
      */
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      window.setTimeout(() => accessToken = '', expiresIn * 1000); //wipe the access token and URL parameters
      window.history.pushState('Access Token', null, '/'); //wipe the access token and URL parameters

      return accessToken;
    }else{
        let url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`; //redirect users to the following URL, interpolating client_id and redirect_uri
        window.location = url; //To redirect a user
    }
  },

  search(term){
    

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { //start the promise chain by returning a GET request (using fetch()) to the following Spotify endpoint
      headers: {
        Authorization: `Bearer ${accessToken}` //Add an Authorization header to the request containing the access token
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => { //Convert the returned response to JSON
      if (!jsonResponse.tracks) {
        return [];
      }
        return jsonResponse.tracks.items.map(track => ({ //map the converted JSON to an array of tracks
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
    });
  },

  savePlaylist(name, trackUris) {
       if (!name || !trackUris.length) { //check if there are values saved to the method's two arguments. If not, return.
           return;
       }

       const accessToken = Spotify.getAccessToken(); //An access token variable, set to the current user's access token
       const headers = { Authorization: `Bearer ${accessToken}` };
       let userId; //an empty variable for the user's ID

       return fetch('https://api.spotify.com/v1/me', { headers: headers } //Make a request that returns the user's Spotify username
       ).then(response => response.json()
     ).then(jsonResponse => { //convert the response to JSON
               userId = jsonResponse.id; // save the response id parameter to the user's ID variable
               return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, { //Use the returned user ID to make a POST request that creates a new playlist in the user's account and returns a playlist ID
                   headers: headers,
                   method: 'POST',
                   body: JSON.stringify({ name: name })
               }).then(response => response.json()
                   ).then(jsonResponse => {
                       const playlistId = jsonResponse.id;
                       return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, { //se the returned user ID to make a POST request that creates a new playlist in the user's account and returns a playlist ID.
                           headers: headers,
                           method: 'POST',
                           body: JSON.stringify({ uris: trackUris })
                       });
                   });
           });
   }

}


  export default Spotify;
