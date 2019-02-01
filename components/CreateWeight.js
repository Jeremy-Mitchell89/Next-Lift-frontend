import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { WEIGHTS_QUERY } from "./Weights";

const StyledForm = styled.form`
  border: 5px solid white;
  padding: 20px;
  line-height: 1.5;
  font-weight: 600;
  margin: 0 auto;
  width: 60%;
  input,
  textarea,
  select {
    width: 50%;
    margin: auto;
    padding: 0.5rem;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid black;
    background-color: #e8eeef;
    border-radius: 3px;
  }
  input:focus,
  textarea:focus,
  select:focus {
    background-color: #b7bbbc;
    outline: none;
  }
  select:focus {
    outline: none;
    opacity: 1.1;
  }
  button:focus,
  button:hover {
    outline: none;
    background-color: rgb(0, 100, 0);
  }
  h1 {
    text-align: center;
  }
  fieldset {
    border: none;
    padding: 0;
    margin: 0 auto;
  }
  button {
    margin-top: 20px;
    margin-left: 40px;
    top: 50%;
    font-size: 1rem;
    padding: 10px 15px 10px 15px;
    background-color: rgb(0, 160, 0);
    :hover {
    }
    border-radius: 10px;
    cursor: pointer;
  }
  button {
    color: #e2e2e2;
  }
`;

const CREATE_WEIGHT_MUTATION = gql`
  mutation CREATE_WEIGHT_MUTATION($weight: Int!) {
    createWeight(weight: $weight) {
      weight
    }
  }
`;

class WeightForm extends React.Component {
  state = { weight: 0 };
  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={CREATE_WEIGHT_MUTATION}
        variables={{ weight: parseFloat(this.state.weight) }}
        refetchQueries={[{ query: WEIGHTS_QUERY }]}
      >
        {(createWeight, { loading, error }) => {
          return (
            <StyledForm
              onSubmit={e => {
                e.preventDefault();
                createWeight();
                this.setState({ weight: 0 });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h1>Enter Today's Weight</h1>
                <input
                  value={this.state.weight}
                  placeholder="Weight"
                  name="weight"
                  type="number"
                  onChange={this.handleChange}
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
export default WeightForm;
