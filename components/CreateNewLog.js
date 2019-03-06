import React from "react";
import gql from "graphql-tag";
import { StyledFormNewLog } from "./styles/StyledForm";
import { Mutation } from "react-apollo";
import Router from "next/router";
import { StyledButton } from "./styles/Inputs";
import { format } from "date-fns";

const CREATE_LOG_MUTATION = gql`
  mutation CREATE_LOG_MUTATION(
    $title: String!
    $notes: String!
    $date: String!
  ) {
    createLog(title: $title, notes: $notes, date: $date) {
      id
    }
  }
`;

class CreateNewLog extends React.Component {
  state = {
    title: "",
    notes: "",
    date: format(new Date(), "YYYY-MM-DD")
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
            <StyledFormNewLog
              onSubmit={async e => {
                e.preventDefault();
                const res = await createLog();
                Router.push({
                  pathname: "/log",
                  query: { id: res.data.createLog.id }
                });
              }}
            >
              <h1>Create A New Log</h1>
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
                  rows="1"
                  value={this.state.notes}
                />
                <input
                  name="date"
                  onChange={this.handleChange}
                  type="date"
                  value={this.state.date}
                />
                <StyledButton type="submit">Submit</StyledButton>
              </fieldset>
            </StyledFormNewLog>
          );
        }}
      </Mutation>
    );
  }
}
export { CREATE_LOG_MUTATION };
export default CreateNewLog;
