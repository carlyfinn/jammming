import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component {
  search(){
    this.props.onSearch(this.props.term);
  }

  handleTermChange(event){
    this.setState({search:event.target.value}); //GET CHECKED
    event.preventDefault();
  }

  constructor(props) {
    super(props); //call the parent constructor


    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange = {this.handleTermChange}/>
        <a>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
