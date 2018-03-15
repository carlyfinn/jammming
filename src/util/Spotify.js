const client_id = 'd6e496b588e148f4a8f711962e2f15cc';
const redirect_uri = 'http://localhost:3000/';

let accessToken = '';
let expiresIn = '';

const Spotify = {
  getAccessToken(){
    if(accessToken){ //Check if the user's access token is already set. If it is, return the value saved to access token.
      return accessToken;
    }else if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)){ //check the URL to see if accessToken has just been obtained
      /*
      Set the access token value
      Set a variable for expiration time
      Set the access token to expire at the value for expiration time
      */
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];

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
    }).then(jsonResponse => { //Convert the returned response to JSON
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.map(track => ({ //map the converted JSON to an array of tracks
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      }
    });
  }


  export default Spotify;
