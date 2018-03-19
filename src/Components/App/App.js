import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props); //call the parent constructor

    this.state = { //option 2
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    }


    this.addTrack = this.addTrack.bind(this); //Bind the current value of this to .addTrack().
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
   let currentTracks = this.state.playlistTracks; //this sets a temporary variable of the playlistTracks
   if (!this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){ //doesn't find any matches
     currentTracks.push(track); //this adds the track to the array of tracks
   }
   this.setState({playlistTracks: currentTracks}); //this sets the state to include the new track
 }

 removeTrack(track){
    let currentTracks = this.state.playlistTracks; //this sets a temporary variable of the playlistTracks
   if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
     currentTracks.pop(track); //this removes the track from the array of tracks
   }
   this.setState({playlistTracks: currentTracks}); //this sets the state to remove the track
 }

  updatePlaylistName(name){
   this.setState({playlistName: name});
 }

 savePlaylist(){
   const trackUris = this.state.playlistTracks.map(track => track.uri);
      Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        });
      });
 }

 search(term){
   Spotify.search(term).then(tracks => { //import Spotify and update the .search() method with the Spotify.search() method.
      this.setState({searchResults: tracks});
    });
 }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar searchBar = {this.state.searchBar} onSearch = {this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults = {this.state.searchResults} onAdd = {this.addTrack}/>
            <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks} onRemove = {this.removeTrack} onNameChange = {this.updatePlaylistName} onSave = {this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

//Line 79 Pass the playlist name and tracks from the App component to the Playlist component
//Line 76 Pass .addTrack() as an onAdd attribute
