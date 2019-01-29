import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { format, parse } from "date-fns";

const WEIGHTS_QUERY = gql`
  query WEIGHTS_QUERY {
    weights(orderBy: createdAt_ASC) {
      weight
      createdAt
    }
  }
`;

class Weights extends React.Component {
  render() {
    return (
      <Query query={WEIGHTS_QUERY}>
        {({ data, loading, error }) => {
          return (
            <div>
              {data.weights.map(weight => (
                <div>
                  <p>{weight.weight}</p>
                  <p>{format(parse(weight.createdAt), "MM/DD/YYYY")}</p>
                </div>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}
export default Weights;
