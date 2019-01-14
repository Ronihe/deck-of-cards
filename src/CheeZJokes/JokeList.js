import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import styled from 'styled-components';

const StyledJokeList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > button {
    background-color: steelblue;
    width: 500px;
    height: 50px;
    color: white;
    border-radius: 25px;
    font-size: 2em;
    transition: background-color 1s;
  }
  & > button:hover {
    background-color: darkblue;
    transition: background-color 1s;
  }
  & > .jokes {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: this.pullFromLS()
    };
  }

  async componentDidMount() {
    await this.getJokes();
  }

  pullFromLS = () => {
    let jokes = [];
    for (let i = 0; i < localStorage.length; i++) {
      jokes.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
    return jokes;
  };

  getJokes = async () => {
    let jokes = await this.get10Jokes();
    jokes = jokes.map(j => {
      j.data.score = 0;
      this.saveJoke(j.data);
      return j.data;
    });
    jokes = [...this.state.jokes, ...jokes];
    this.setState({ jokes: jokes });
  };

  voteScore = (id, scoreChange) => {
    let updatedJokes = this.state.jokes.map(j => {
      if (j.id === id) {
        j.score = j.score + scoreChange;
        this.saveJoke(j);
      }
      return j;
    });

    // Sorts by descending score
    updatedJokes.sort((a, b) =>
      a.score > b.score ? -1 : b.score > a.score ? 1 : 0
    );

    this.setState({ jokes: updatedJokes });
  };

  saveJoke = j => {
    localStorage.setItem(j.id, JSON.stringify(j));
  };

  clearJoke = () => {
    localStorage.clear();
    this.setState({ jokes: [] });
  };

  // Not working
  /*
  getUniqueJoke = async jokes => {
    let setJokes = new Set(jokes);
    while (setJokes.length < 10) {
      console.log('In the function');
      let response = await axios.get('https://icanhazdadjoke.com', {
        headers: { Accept: 'application/json' }
      });
      response.data.score = 0;
      jokes = [...setJokes];
      jokes.push(response.data);
      setJokes = new Set(jokes);
    }
    return true;
  };
  */

  get10Jokes = async () => {
    let jokePromises = [];
    for (let i = 0; i < 10; i++) {
      jokePromises.push(
        axios.get('https://icanhazdadjoke.com', {
          headers: { Accept: 'application/json' }
        })
      );
    }
    return await Promise.all(jokePromises);
  };

  renderJokes = jokes => {
    return jokes.map(j => {
      return (
        <Joke
          key={j.id}
          id={j.id}
          score={j.score}
          joke={j.joke}
          vote={this.voteScore}
        />
      );
    });
  };

  render() {
    return (
      <StyledJokeList className="JokeList">
        <h1>I can Haz Dad Jokes</h1>
        <button onClick={this.getJokes}>Get more jokes!</button>
        <button onClick={this.clearJoke}>Clear Saved Jokes</button>
        <div className="jokes">
          {this.state.jokes.length === 0
            ? 'No jokes available at the moment.'
            : this.renderJokes(this.state.jokes)}
        </div>
      </StyledJokeList>
    );
  }
}

JokeList.defaultProps = {};

JokeList.propTypes = {};

export default JokeList;
