import React from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList'; //adding because it is a component below

class Playlist extends React.Component {
  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'}/>
        <TrackList tracks = {this.props.playlistTracks} /> //Pass the playlist tracks from the Playlist component to the TrackList component
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
