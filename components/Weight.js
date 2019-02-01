import { format, parse } from "date-fns";
import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { WEIGHTS_QUERY } from "./Weights";
import styled from "styled-components";

const DELETE_WEIGHT_MUTATION = gql`
  mutation DELETE_WEIGHT_MUTATION($id: ID!) {
    deleteWeight(id: $id) {
      id
    }
  }
`;
const DeleteButton = styled.button`
  margin: 10px;
  top: 50%;
  max-width: 100px;
  font-size: 1.1rem;
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
              <DeleteButton
                onClick={e => {
                  e.preventDefault();
                  deleteWeight();
                }}
              >
                Delete
              </DeleteButton>
            </>
          );
        }}
      </Mutation>
    );
  }
}

export default Weight;
