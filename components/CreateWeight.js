import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { WEIGHTS_QUERY } from "./Weights";
import { StyledButton, StyledInput } from "./styles/Inputs";

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
    border-radius: 3px;
  }
  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }
  h1 {
    text-align: center;
  }
  fieldset {
    border: none;
    padding: 0;
    margin: 0 auto;
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
                <StyledInput
                  value={this.state.weight}
                  placeholder="Weight"
                  name="weight"
                  type="number"
                  onChange={this.handleChange}
                />
                <StyledButton type="submit">Submit</StyledButton>
              </fieldset>
            </StyledForm>
          );
        }}
      </Mutation>
    );
  }
}
export default WeightForm;
