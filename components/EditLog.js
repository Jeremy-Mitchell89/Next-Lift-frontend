import React from "react";
import gql from "graphql-tag";
import { StyledFormNewLog } from "./styles/StyledForm";
import { Mutation, Query } from "react-apollo";
import Router from "next/router";
import { StyledButton } from "./styles/Inputs";
import { format, parse } from "date-fns";
import { LOG_DETAILS_QUERY } from "./LogDetails";

const EDIT_LOG_MUTATION = gql`
  mutation EDIT_LOG_MUTATION(
    $id: ID!
    $title: String
    $notes: String
    $date: String
  ) {
    updateLog(id: $id, title: $title, notes: $notes, date: $date) {
      id
    }
  }
`;

class CreateNewLog extends React.Component {
  state = {};
  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Query query={LOG_DETAILS_QUERY} variables={{ id: this.props.id }}>
        {({ data }) => {
          return (
            <Mutation
              mutation={EDIT_LOG_MUTATION}
              variables={{
                ...this.state,
                id: data.log.id
              }}
            >
              {(updateLog, { error, loading }) => {
                return (
                  <StyledFormNewLog
                    onSubmit={async e => {
                      e.preventDefault();
                      const res = await updateLog();
                      Router.push({
                        pathname: "/log",
                        query: { id: res.data.updateLog.id }
                      });
                    }}
                  >
                    <h1>Edit Log</h1>
                    <fieldset>
                      <label>Title of Log</label>
                      <input
                        name="title"
                        onChange={this.handleChange}
                        type="text"
                        defaultValue={data.log.title}
                      />
                      <label>Notes</label>
                      <textarea
                        onChange={this.handleChange}
                        type="text"
                        name="notes"
                        rows="1"
                        defaultValue={data.log.notes}
                      />
                      <input
                        name="date"
                        onChange={this.handleChange}
                        type="date"
                        defaultValue={data.log.date}
                      />
                      <StyledButton type="submit">Submit</StyledButton>
                    </fieldset>
                  </StyledFormNewLog>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}
export { CREATE_LOG_MUTATION };
export default CreateNewLog;
