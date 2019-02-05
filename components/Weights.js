import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import styled from "styled-components";
import Weight from "./Weight";

const WEIGHTS_QUERY = gql`
  query WEIGHTS_QUERY {
    weights(orderBy: createdAt_ASC) {
      weight
      createdAt
      id
    }
  }
`;

const WeightContainer = styled.div`
  margin-left: 3%;
  display: grid;
  grid-template-columns: 100px 120px 1fr;
  width: 80%;
`;

class Weights extends React.Component {
  render() {
    return (
      <Query query={WEIGHTS_QUERY}>
        {({ data, loading, error }) => {
          if (!data.weights.length) {
            return <p>Enter a Weight to start tracking your progess!</p>;
          }
          return (
            <div>
              <h1 style={{ paddingTop: "4%" }}>Weight Tracker</h1>
              <WeightContainer>
                <h3 style={{ textAlign: "center" }}>Date</h3>
                <h3 style={{ textAlign: "center" }}>Weight</h3>
                <span />
                {data.weights.map(weight => (
                  <Weight key={weight.id} weight={weight} />
                ))}
              </WeightContainer>
            </div>
          );
        }}
      </Query>
    );
  }
}
export default Weights;
export { WEIGHTS_QUERY };
