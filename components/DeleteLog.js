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
  color: #e2e2e2;
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

class DeleteLog extends Component {
  update = (cache, payload) => {
    const data = cache.readQuery({ query: MY_LOGS_QUERY });
    data.myLogs = data.myLogs.filter(
      log => log.id !== payload.data.deleteLog.id
    );
    cache.writeQuery({ query: MY_LOGS_QUERY, data });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_LOG_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteLog, { error, loading }) => {
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
