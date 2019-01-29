import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const StyledForm = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  line-height: 1.5;
  font-weight: 600;
  margin: 0 auto;
  width: 30%;
  input,
  textarea,
  select {
    width: 100%;
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
    border: 0;
    padding: 0;
    width: 70%;
    margin: 0 auto;
  }
  button {
    margin-top: 20px;
    top: 50%;
    font-size: 1.5rem;
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
