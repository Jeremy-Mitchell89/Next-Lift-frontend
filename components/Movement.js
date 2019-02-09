import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { ALL_MOVEMENTS_QUERY } from "./Movements";
import Link from "next/link";

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
const EditButton = styled.a`
  margin: 10px;
  top: 50%;
  font-size: 1rem;
  padding: 10px 15px 10px 15px;
  background-color: rgb(244, 152, 65);
  color: #ffffff;
  :hover {
    background-color: #f98211;
    outline: none;
  }
  border-radius: 10px;
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

const DeleteButton = styled.button`
  margin: 10px;
  top: 50%;
  font-size: 1rem;
  padding: 10px 15px 10px 15px;
  background-color: rgb(244, 80, 66);
  color: #e2e2e2;
  border: none;
  :hover {
    cursor: pointer;
    background-color: #ed2a1a;
    outline: none;
  }
  border-radius: 10px;
  :focus {
    outline: none;
  }
`;
class Movement extends React.Component {
  update = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_MOVEMENTS_QUERY });

    data.movements = data.movements.filter(
      movement => movement.id !== payload.data.deleteMovement.id
    );
    console.log(data);
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
              <DeleteButton
                onClick={e => {
                  e.preventDefault();
                  deleteMovement();
                }}
              >
                Delete Movement
              </DeleteButton>
              <Link
                href={{
                  pathname: "/update",
                  query: { id: this.props.move.id }
                }}
              >
                <EditButton>Edit Movement</EditButton>
              </Link>
            </div>
          </StyledItem>
        )}
      </Mutation>
    );
  }
}

export default Movement;
