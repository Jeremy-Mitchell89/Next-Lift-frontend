import React from "react";
import gql from "graphql-tag";
import StyledForm from "./styles/StyledForm";
import { Mutation } from "react-apollo";
import Router from "next/router";

const CREATE_LOG_MUTATION = gql`
  mutation CREATE_LOG_MUTATION($title: String!, $notes: String!) {
    createLog(title: $title, notes: $notes) {
      id
    }
  }
`;

class CreateNewLog extends React.Component {
  state = {
    title: "",
    notes: ""
  };
  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation mutation={CREATE_LOG_MUTATION} variables={this.state}>
        {(createLog, { error, loading }) => {
          return (
            <StyledForm
              onSubmit={async e => {
                e.preventDefault();
                const res = await createLog();
                console.log(res);
              }}
            >
              <fieldset>
                <label>Title of Log</label>
                <input
                  name="title"
                  onChange={this.handleChange}
                  type="text"
                  value={this.state.title}
                />
                <label>Notes</label>
                <textarea
                  onChange={this.handleChange}
                  type="text"
                  name="notes"
                  rows="4"
                  value={this.state.notes}
                />
                <button type="submit">Submit</button>
              </fieldset>
            </StyledForm>
          );
        }}
      </Mutation>
    );
  }
}

export default CreateNewLog;
