import React from 'react';
import './TrackList.css';

import Track from '../Track/Track'; //adding because it is a component below


class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
      {
          this.props.tracks.map(track => {
            return <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove = {this.props.onRemove} isRemoval={this.props.isRemoval}/> //Pass onRemove from the TrackList component to the Track component
          })
      }
      </div>

    );
  }
}

export default TrackList;
//render each track in the tracks property Line 12
