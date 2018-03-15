import React from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList'; //adding because it is a component below

class Playlist extends React.Component {
  /*
  The below method should accept an event that is triggered by an onChange attribute
  in the Playlist component's <input> element.
  */
  handleNameChange(event){ //GET CHECKED
    this.props.onNameChange(event.target.value); //call .onNameChange() with the event target's value (from the <input> element
    event.preventDefault();
  }

  constructor(props) {
    super(props);

    this.handleNameChange= this.handleNameChange.bind(this);
  }


  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange = {this.handleNameChange}/> //Step 61
        <TrackList tracks = {this.props.playlistTracks} onRemove = {this.props.onRemove}/> //Pass the playlist tracks from the Playlist component to the TrackList component, Pass onRemove from the Playlist component to the TrackList component
        <a className="Playlist-save" onClick = {this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
