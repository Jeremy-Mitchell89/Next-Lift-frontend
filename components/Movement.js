import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { ALL_MOVEMENTS_QUERY } from "./Movements";
import Link from "next/link";
import { StyledButton, StyledSecondaryButton } from "./styles/Inputs";

const StyledItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  background-color: white;
  border-bottom: 1px solid black;
`;

const DELETE_MOVEMENT_MUTATION = gql`
  mutation DELETE_MOVEMENT_MUTATION($id: ID!) {
    deleteMovement(id: $id) {
      id
    }
  }
`;
class Movement extends React.Component {
  update = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_MOVEMENTS_QUERY });

    data.movements = data.movements.filter(
      movement => movement.id !== payload.data.deleteMovement.id
    );
    cache.writeQuery({ query: ALL_MOVEMENTS_QUERY, data });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_MOVEMENT_MUTATION}
        variables={{ id: this.props.move.id }}
        update={this.update}
      >
        {(deleteMovement, { error, loading }) => (
          <StyledItem>
            <h2>{this.props.move.name}</h2>
            <p>{this.props.move.description}</p>
            <p>{this.props.move.primaryMuscleWorked}</p>
            <p>{this.props.move.secondaryMuscleWorked}</p>
            <div
              style={{ display: "flex", flexDirection: "column", width: "70%" }}
            >
              <Link
                href={{
                  pathname: "/update",
                  query: { id: this.props.move.id }
                }}
              >
                <StyledSecondaryButton>Edit Movement</StyledSecondaryButton>
              </Link>
              <StyledButton
                onClick={e => {
                  e.preventDefault();
                  deleteMovement();
                }}
              >
                Delete Movement
              </StyledButton>
            </div>
          </StyledItem>
        )}
      </Mutation>
    );
  }
}

export default Movement;
