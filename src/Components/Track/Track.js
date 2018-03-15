import React from 'react';
import './Track.css';


class Track extends React.Component {
  addTrack () {
   this.props.onAdd(this.props.track);
  }

  removeTrack () {
   this.props.onRemove(this.props.track);
  }

  constructor(props) {
    super(props); //call the parent constructor


    this.addTrack = this.addTrack.bind(this); //Bind the current value of this to .addTrack().
    this.removeTrack = this.removeTrack.bind(this);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className="Track-action">
          {!this.props.isRemoval ?
          <div onClick={this.addTrack}>+</div> :
          <div onClick={this.removeTrack}>-</div>}
        </a>
      </div>
    );
  }
}

export default Track;



//Line 10: //property calls to access the track's name, artist, and album
