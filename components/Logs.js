import React, { createContext } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Log from "./Log";
import User from "./User";
import Error from "./ErrorMessage";

const MY_LOGS_QUERY = gql`
  query MY_LOGS_QUERY {
    myLogs(orderBy: createdAt_DESC) {
      id
      title
      notes
      date
      createdAt
      movements {
        weight
        reps
      }
      user {
        id
        name
      }
    }
  }
`;
const Container = styled.div`
  width: 70%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0px;
  margin: 0 auto;
  text-align: center;
  p {
    margin-top: 1rem;
    padding-top: 1rem;
    text-align: center;
  }
`;

class Logs extends React.Component {
  render() {
    return (
      <User>
        {({ data: { me }, error }) => {
          if (!me) return <h2>Log in to view your Logs!</h2>;
          // if (error) return <p>{error}</p>;
          return (
            <Query query={MY_LOGS_QUERY} variables={{ id: me.id }}>
              {({ data, error, loading }) => {
                return (
                  <Container>
                    <Error error={error} />
                    {data.myLogs.map(log => (
                      <Log log={log} key={log.id} />
                    ))}
                  </Container>
                );
              }}
            </Query>
          );
        }}
      </User>
    );
  }
}

export default Logs;
export { MY_LOGS_QUERY };
