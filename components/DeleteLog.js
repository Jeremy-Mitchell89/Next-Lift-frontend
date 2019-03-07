import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { MY_LOGS_QUERY } from "./Logs";
import { StyledButton } from "./styles/Inputs";

const DELETE_LOG_MUTATION = gql`
  mutation DELETE_LOG_MUTATION($id: ID!) {
    deleteLog(id: $id) {
      id
    }
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
            <StyledButton
              style={{ margin: "0 0 20px 0 " }}
              onClick={e => {
                e.preventDefault();
                deleteLog();
              }}
            >
              Delete Log
            </StyledButton>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteLog;
