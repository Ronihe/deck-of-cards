import React, { Component } from 'react';
import './App.css';
// import Board from './Board';
import JokeList from './CheeZJokes/JokeList';
import Board from './DeckOfCards/Board';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board />
        <JokeList />
      </div>
    );
  }
}

export default App;
