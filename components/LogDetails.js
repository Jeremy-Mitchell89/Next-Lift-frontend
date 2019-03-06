import React from "react";
import AddMovement from "./AddMovement";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components";
import LogMove from "./LogMove";
import DuplicateLog from "./DuplicateLog";

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
        id
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

class LogDetails extends React.Component {
  render() {
    return (
      <Query
        query={LOG_DETAILS_QUERY}
        variables={{ id: this.props.id }}
        refetchQueries={[
          { query: LOG_DETAILS_QUERY, variables: { id: this.props.id } }
        ]}
      >
        {({ data, loading }) => {
          return (
            <div>
              <AddMovement id={this.props.id} />
              <div>
                <h1>{data.log.title}</h1>
                <p>{data.log.notes}</p>
              </div>
              <DuplicateLog log={data.log} />
              <MovementContainer>
                {data.log.movements.map((move, i) => {
                  return (
                    <LogMove
                      logId={this.props.id}
                      key={move.id}
                      name={move.name}
                      weight={move.weight}
                      reps={move.reps}
                      id={move.id}
                    />
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
export { LOG_DETAILS_QUERY };
