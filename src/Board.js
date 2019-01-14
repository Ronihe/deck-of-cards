import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
import styled from 'styled-components';

const StyledDeck = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

class Board extends Component {
  constructor(props) {
    super(props);
    // store all the cards info from API to state
    this.state = {
      deckId: undefined,
      cardImgs: []
    };
    // this.method = this.method.bind(this);
  }

  //call the decer API to get a decker ID, when the page is loading
  async componentDidMount() {
    const deckIdRes = await axios.get(
      `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
    );
    console.log(deckIdRes);
    const deckId = deckIdRes.data.deck_id;
    this.setState({ deckId: deckId });
  }

  // pick a card with deckId and API
  getAcard = async () => {
    console.log('is it working?');
    const card = await axios.get(
      `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`
    );

    const img = card.data.cards[0].image;
    //update the state.imgs array

    //console.log(this.state.cardImgs.push(img));
    this.setState(st => {
      const newCards = st.cardImgs.slice();
      newCards.push(img);
      return { cardImgs: newCards };
    });
  };

  render() {
    //const cards = this.stat
    console.log(this.state.cardImgs);
    const cards = this.state.cardImgs.map(el => {
      return <Card img={el} />;
    });
    return (
      <div>
        <button onClick={this.getAcard}>Gimme A Card</button>
        <StyledDeck>{cards}</StyledDeck>
      </div>
    );
  }
}
export default Board;
