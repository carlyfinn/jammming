import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props); //call the parent constructor

    this.state = { //option 2
      searchResults: [
        {name: 'Carly',
        artist: 'Rihanna',
        properties: 'idk'},
        {
         name: 'Ana',
         artist: 'Beyonce',
         properties: 'still who knows'
       }
      ],
      playlistName: 'Tunez',
      playlistTracks: [
        {name: ' ',
        artist: ' ',
        album: ' '}
      ]
    }

    //this.addTrack = this.addTrack.bind(this); //Bind the current value of this to .addTrack().
  }
/*
  addTrack(track){
   if(//this.state.playlistTracks.find() doesn't find any matches){
     let currentTracks = this.state.playlistTracks; //this sets a temporary variable of the playlistTracks
     currentTracks.push(track); //this adds the track to the array of tracks
   }
   this.setState({playlistTracks: currentTracks}); //this sets the state to include the new track
 }*/

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchResults searchResults = {this.state.searchResults} /*onAdd = {this.addTrack}*//> //Pass .addTrack() as an onAdd attribute
        //  Add a SearchBar component -->
          <div className="App-playlist">
        //   Add a SearchResults component -->
            <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks}/> //Pass the playlist name and tracks from the App component to the Playlist component
          </div>
        </div>
      </div>
    );
  }
}

export default App;
