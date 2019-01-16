import React from "react";
import StyledForm from "./styles/StyledForm";
import AddMovement from "./AddMovement";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components";

const LOG_DETAILS_QUERY = gql`
  query LOG_DETAILS_QUERY($id: ID!) {
    log(where: { id: $id }) {
      id
      title
      notes
      movements {
        name
        weight
        reps
      }
    }
  }
`;

const MovementContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  h1 {
    margin-bottom: 5px;
  }
  p {
    margin-top: 5px;
  }
`;

const SetContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  width: 1 rem;
`;

class LogDetails extends React.Component {
  render() {
    return (
      <Query query={LOG_DETAILS_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          return (
            <div>
              <AddMovement id={this.props.id} />
              <MovementContainer>
                {data.log.movements.map(move => {
                  return (
                    <div>
                      <div>
                        <h1>{move.name}</h1>
                      </div>
                      <SetContainer>
                        {move.weight.map((w, i) => (
                          <p>
                            {w}x{move.reps[i]}
                          </p>
                        ))}
                      </SetContainer>
                    </div>
                  );
                })}
              </MovementContainer>
              <div />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default LogDetails;
