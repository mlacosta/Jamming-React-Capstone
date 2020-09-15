import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchResults from './SearchResults/SearchResult';
import SearchBar from './SearchBar/SearchBar';
import Playlist from './Playlist/Playlist';
let someTracks  = [
                    {name:'Automata', artist:'She', album:'Chroma',id:1},
                    {name:'Interestellar', artist:'Au5', album:'Interestellar',id:2},
                    {name:'Always Yours', artist:'She', album:'Unknown',id:3},
                    {name:'C Stick', artist:'game Boi Adv', album:'Unknown',id:4},
                  ]

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {SearchResults:[{name:'Bangarang', artist:'Skrillex', album:'Bangarang',id:01}],
                  playlistName: 'Awesome',
                  playlistTrack: someTracks};
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track){
    if (this.state.playlistTrack.find(savedTrack => savedTrack.id === track.id)) {
      let trackArray = this.state.playlistTracks;
      trackArray.push(track);
      this.setState({playlistTrack:trackArray});
    }
  }

  removeTrack(track){
    let newPlaylist = this.state.playlistTrack.filter(element => {element.id !== track.id });  
    this.setState({playlistTrack: newPlaylist});
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults = {this.state.SearchResults}  onAdd = {this.addTrack}/>
            <Playlist playlistName = {this.state.playlistName} playlistTrack = {this.state.playlistTrack} onRemove = {this.removeTrack} />
          </div>
        </div>
      </div>
    )
  }

}

export default App;
