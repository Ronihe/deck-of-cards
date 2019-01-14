import React, { Component } from 'react';
import styled from 'styled-components';

/* call api in Board component, pass the img link as props here */

const StyledCard = styled.div`
  display: flex;
  flex-direction: row;
`;

class Card extends Component {
  render() {
    return <img src={this.props.img} alt="" />;
  }
}
export default Card;
