import React from 'react';
import './SearchResults.css';

import TrackList from '../TrackList/TrackList'; //adding because it is a component below


class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks = {this.props.searchResults} onAdd = {this.props.onAdd}/>
      </div>
    );
  }
}

export default SearchResults;


//Line 12: Pass the search results from the SearchResults component to the TrackList component; Pass onAdd from the SearchResults component to the TrackList component
