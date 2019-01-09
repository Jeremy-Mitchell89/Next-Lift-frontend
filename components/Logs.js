import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Log from "./Log";

const ALL_LOGS_QUERY = gql`
  query ALL_LOGS_QUERY($skip: Int = 0, $first: Int = 16) {
    logs(first: $first, skip: $skip, orderBy: title_DESC) {
      id
      title
      notes
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
      <Query query={ALL_LOGS_QUERY}>
        {({ data, error, loading }) => {
          {
            console.log(data);
          }
          return (
            <Container>
              <ContainerLabels />
              {data.logs.map(log => (
                <Log log={log} key={log.id} />
              ))}
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default Logs;
