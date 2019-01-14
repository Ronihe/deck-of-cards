import React, { Component } from 'react';
import styled from 'styled-components';

const StyledJoke = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 300px;
  height: 175px;
  margin: 5px;
  background-color: steelblue;
  box-shadow: 5px 5px grey;
  & > .vote-buttons {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
  }
  & > .score {
    margin-botton: 5px;
    color: lightgrey;
  }
  & > .joke {
    color: white;
  }
`;

class Joke extends Component {
  handleVoteUp = () => {
    this.props.vote(this.props.id, 1);
  };
  handleVoteDown = () => {
    this.props.vote(this.props.id, -1);
  };
  handleStore = () => {
    this.props.saveJoke(this.props.id);
  };

  render() {
    return (
      <StyledJoke className="Joke">
        <p className="joke">{this.props.joke}</p>
        <div className="score">Rating: {this.props.score}</div>
        <div className="vote-buttons">
          <button onClick={this.handleVoteUp}>Vote Up</button> {/* Vote up */}
          <button onClick={this.handleVoteDown}>Vote Down</button>
          {/* Vote down */}
        </div>
      </StyledJoke>
    );
  }
}

Joke.defaultProps = {
  id: '',
  score: 0,
  joke: '',
  voteUp: console.log,
  voteDown: console.log
};

export default Joke;
