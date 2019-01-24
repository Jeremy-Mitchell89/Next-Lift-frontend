import React, { createContext } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Log from "./Log";
import User from "./User";

// const MY_LOGS_QUERY = gql`
//   query MY_LOGS_QUERY($skip: Int = 0, $first: Int = 16) {
//     logs(first: $first, skip: $skip, orderBy: title_DESC) {
//       id
//       title
//       notes
//       user {
//         id
//         name
//       }
//     }
//   }
// `;

const MY_LOGS_QUERY = gql`
  query MY_LOGS_QUERY {
    myLogs {
      id
      title
      notes
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
const ContainerLabels = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 0px;
  border-bottom: 3px solid black;
  background-color: white;
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
                console.log(data);
                return (
                  <Container>
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
