import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import Link from "next/link";
import { Mutation } from "react-apollo";
import { LOG_DETAILS_QUERY } from "./LogDetails";
import { StyledButton, StyledSecondaryButton } from "./styles/Inputs";

const DELETE_LOGMOVE_MUTATION = gql`
  mutation DELETE_LOGMOVE_MUTATION($id: ID!) {
    deleteMove(id: $id) {
      id
    }
  }
`;

const SetContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  width: 1 rem;
`;

class LogMove extends React.Component {
  update = (cache, payload) => {
    const data = cache.readQuery({
      query: LOG_DETAILS_QUERY,
      variables: { id: this.props.logId }
    });
    data.log.movements = data.log.movements.filter(
      move => move.id !== payload.data.deleteMove.id
    );
    cache.writeQuery({ query: LOG_DETAILS_QUERY, data });
  };
  render() {
    const { name, weight, reps, id, logId } = this.props;
    return (
      <Mutation
        mutation={DELETE_LOGMOVE_MUTATION}
        variables={{ id: id }}
        update={this.update}
      >
        {(deleteMove, { loading, error }) => {
          if (loading) return <p>Removing This Set</p>;
          return (
            <div key={id}>
              <div>
                <h1>{name}</h1>
              </div>
              <SetContainer>
                {weight.map((w, i) => (
                  <div key={i}>
                    <p>
                      {w}x{reps[i]}
                    </p>
                  </div>
                ))}
              </SetContainer>
              <Link
                href={{
                  pathname: "/updatemove",
                  query: { logId: logId, id: id, reps: reps, weight: weight }
                }}
              >
                <StyledSecondaryButton>Edit Movement</StyledSecondaryButton>
              </Link>
              <StyledButton
                onClick={e => {
                  deleteMove();
                }}
              >
                Delete Movement
              </StyledButton>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default LogMove;
