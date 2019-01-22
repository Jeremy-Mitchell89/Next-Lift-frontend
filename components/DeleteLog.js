import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { MY_LOGS_QUERY } from "./Logs";
import styled from "styled-components";

const DELETE_LOG_MUTATION = gql`
  mutation DELETE_LOG_MUTATION($id: ID!) {
    deleteLog(id: $id) {
      id
    }
  }
`;

const DeleteButton = styled.button`
  margin: 10px;
  top: 50%;
  font-size: 1.5rem;
  padding: 10px 15px 10px 15px;
  background-color: rgb(244, 80, 66);
  :hover {
    cursor: pointer;
  }
  border-radius: 10px;
`;

class DeleteLog extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_LOG_MUTATION}
        variables={{ id: this.props.id }}
      >
        {(deleteLog, { error }) => {
          return (
            <DeleteButton
              onClick={e => {
                e.preventDefault();
                deleteLog();
              }}
            >
              Delete Log
            </DeleteButton>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteLog;
