import React from "react";
import styled from "styled-components";

const StyledItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  background-color: white;
  border-bottom: 1px solid black;
`;

class Movement extends React.Component {
  render() {
    return (
      <StyledItem>
        <h2>{this.props.move.name}</h2>
        <p>{this.props.move.description}</p>
        <p>{this.props.move.primaryMuscleWorked}</p>
        <p>{this.props.move.secondaryMuscleWorked}</p>
      </StyledItem>
    );
  }
}

export default Movement;
