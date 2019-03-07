import React from "react";
import { CREATE_LOG_MUTATION } from "./CreateNewLog";
import { Mutation } from "react-apollo";
import { format } from "date-fns";
import gql from "graphql-tag";
import { StyledButton } from "./styles/Inputs";

const DUPLICATE_TO_LOG_MUTATION = gql`
  mutation DUPLICATE_TO_LOG_MUTATION(
    $logId: ID!
    $name: String!
    $weight: [Int!]
    $reps: [Int!]
  ) {
    DuplicateLogMoves(
      logId: $logId
      name: $name
      weight: $weight
      reps: $reps
    ) {
      name
      weight
      reps
    }
  }
`;

class DuplicateLog extends React.Component {
  render() {
    return (
      <Mutation
        mutation={CREATE_LOG_MUTATION}
        variables={{
          title: this.props.log.title,
          notes: this.props.log.notes,
          date: format(new Date(), "YYYY-MM-DD")
        }}
      >
        {createLog => {
          return (
            <Mutation
              mutation={DUPLICATE_TO_LOG_MUTATION}
              // variables={this.props.log.movements}
            >
              {DuplicateLogMoves => {
                return (
                  <StyledButton
                    onClick={async e => {
                      const log = await createLog().then(newLog => {
                        console.log(this.props.log.movements);
                        this.props.log.movements.map(move => {
                          DuplicateLogMoves({
                            variables: {
                              logId: newLog.data.createLog.id,
                              name: move.name,
                              reps: move.reps,
                              weight: move.weight
                            }
                          });
                        });
                      });
                    }}
                  >
                    Duplicate Log
                  </StyledButton>
                );
              }}
            </Mutation>
          );
        }}
      </Mutation>
    );
  }
}

export default DuplicateLog;
