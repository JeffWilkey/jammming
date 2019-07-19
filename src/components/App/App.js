import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{ name: 'Are U Dead Yet?', artist: 'Children of Bodom', album: 'Are U Dead Yet?' }],
      playlistName: "Jeff's mix",
      playlistTracks: [{ name: 'Alligator', artist: 'Of Monsters and Men', album: 'Fever Dream' }]
    }
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      const playlistTracks = new Array(...this.state.playlistTracks);
      playlistTracks.push(track);
      this.setState({ playlistTracks });
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist name={this.state.playlistName} tracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
