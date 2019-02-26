import { format, parse } from "date-fns";
import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { WEIGHTS_QUERY } from "./Weights";
import styled from "styled-components";
import { StyledSecondaryButton } from "./styles/Inputs";

const DELETE_WEIGHT_MUTATION = gql`
  mutation DELETE_WEIGHT_MUTATION($id: ID!) {
    deleteWeight(id: $id) {
      id
    }
  }
`;

class Weight extends React.Component {
  update = (cache, payload) => {
    const data = cache.readQuery({ query: WEIGHTS_QUERY });
    data.weights = data.weights.filter(
      weight => weight.id !== payload.data.deleteWeight.id
    );
    cache.writeQuery({ query: WEIGHTS_QUERY, data });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_WEIGHT_MUTATION}
        variables={{ id: this.props.weight.id }}
        update={this.update}
      >
        {(deleteWeight, { error, loading }) => {
          return (
            <>
              <div>
                <p
                  style={{
                    padding: "10px 10px",
                    textAlign: "center"
                  }}
                >
                  {format(parse(this.props.weight.createdAt), "MM/DD/YYYY")}
                </p>
              </div>

              <div>
                <p
                  style={{
                    padding: "10px 10px",
                    textAlign: "center"
                  }}
                >
                  {this.props.weight.weight} lbs.
                </p>
              </div>
              <StyledSecondaryButton
                onClick={e => {
                  e.preventDefault();
                  deleteWeight();
                }}
                style={{ width: "30%" }}
              >
                Delete
              </StyledSecondaryButton>
            </>
          );
        }}
      </Mutation>
    );
  }
}

export default Weight;
