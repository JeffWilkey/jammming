import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search(e) {
    e.preventDefault();
    this.props.onSearch(this.state.searchTerm);
  }

  handleTermChange(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }
  
  render() {
    return (
      <div className="SearchBar">
        <input value={this.state.searchTerm} onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <button onClick={this.search} className="SearchButton">SEARCH</button>
      </div>
    )
  }
}