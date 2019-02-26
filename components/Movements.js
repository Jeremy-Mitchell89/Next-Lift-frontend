import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Movement from "./Movement";
import Error from "./ErrorMessage";

const ALL_MOVEMENTS_QUERY = gql`
  query ALL_MOVEMENTS_QUERY($skip: Int = 0, $first: Int = 16) {
    movements(first: $first, skip: $skip, orderBy: name_DESC) {
      id
      name
      description
      primaryMuscleWorked
      secondaryMuscleWorked
    }
  }
`;
const Container = styled.div`
  width: 70%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0px;
  margin: 0 auto;
  text-align: center;
  p {
    margin-top: 1rem;
    padding-top: 1rem;
    text-align: center;
  }
`;
const ContainerLabels = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 0px;
  border-bottom: 3px solid black;
  background-color: white;
`;

class Movements extends React.Component {
  render() {
    return (
      <Query query={ALL_MOVEMENTS_QUERY}>
        {({ data, error, loading }) => {
          return (
            <Container>
              <Error error={error} />
              <ContainerLabels>
                <h2>Movement</h2>
                <h2>Description</h2>
                <h2>Primary Muscle Worked</h2>
                <h2>Secondary Muscle Worked</h2>
                <div />
              </ContainerLabels>
              {data.movements.map(movement => (
                <Movement move={movement} key={movement.id} />
              ))}
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default Movements;

export { ALL_MOVEMENTS_QUERY };
