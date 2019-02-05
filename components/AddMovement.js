import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { LOG_DETAILS_QUERY } from "./LogDetails";
// import StyledForm from "./styles/StyledForm";

const StyledForm = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  line-height: 1.5;
  font-weight: 600;

  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid black;
    margin: 0.5rem;
    background-color: #e8eeef;
    border-radius: 3px;
  }
  input[type="number"] {
    width: 70%;
    justify-self: center;
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
  button,
  input[type="submit"] {
    margin: 10px;
    top: 50%;
    font-size: 1.5rem;
    padding: 5px;
    background-color: rgb(0, 160, 0);
    :hover {
    }
    border-radius: 10px;
    cursor: pointer;
  }
  fieldset {
    border: 0;
    padding: 0;
    width: 50%;
    margin: 0 auto;
  }
  button {
    color: #e2e2e2;
  }
  ul {
    margin-left: 0;
    padding-left: 0;
  }
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  input {
    margin: 10px;
  }
  li {
    list-style: none;
  }
`;

const SubmitButton = styled.button`
  max-height: 70px;
  top: 50%;
  font-size: 1.2rem;
  margin: 25px;
  background-color: rgb(244, 152, 65);
  color: #ffffff;
  :hover {
    background-color: #f98211;
    outline: none;
  }
  border-radius: 10px;
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

const ADD_TO_LOG_MUTATION = gql`
  mutation ADD_TO_LOG_MUTATION($name: String!, $weight: [Int!], $reps: [Int!]) {
    createLogMove(name: $name, weight: $weight, reps: $reps) {
      name
      weight
      reps
    }
  }
`;

class AddMovement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      weight: [],
      reps: [],
      show: false
    };
    this.handleNewMovement = this.handleNewMovement.bind(this);
  }

  handleChangeWeight = e => {
    e.preventDefault();
    const index = Number(e.target.name.split("-")[1]);
    const weight = this.state.weight.map((weight, i) =>
      i === index ? Number(e.target.value) : weight
    );
    this.setState({ weight: weight });
  };
  handleChangeReps = e => {
    e.preventDefault();
    const index = Number(e.target.name.split("-")[1]);
    const reps = this.state.reps.map((rep, i) =>
      i === index ? Number(e.target.value) : rep
    );
    this.setState({ reps: reps });
  };
  handleNewMovement(e) {
    e.preventDefault();
    const { weight, reps } = this.state;
    this.setState({
      weight: [...weight, weight[weight.length - 1]],
      reps: [...reps, reps[reps.length - 1]]
    });
  }
  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const weights = this.state.weight.map((weight, i) => (
      <ul key={i}>
        <li>
          {i + 1}.
          <input
            key={i}
            name={`weight-${i}`}
            type="number"
            value={weight}
            onChange={this.handleChangeWeight}
          />
        </li>
      </ul>
    ));
    const reps = this.state.reps.map((reps, i) => (
      <ul key={i}>
        <input
          key={i}
          name={`reps-${i}`}
          type="number"
          value={reps}
          onChange={this.handleChangeReps}
        />
      </ul>
    ));
    return (
      <Mutation
        mutation={ADD_TO_LOG_MUTATION}
        variables={{
          id: this.props.id,
          name: this.state.name,
          reps: this.state.reps,
          weight: this.state.weight
        }}
        refetchQueries={[
          { query: LOG_DETAILS_QUERY, variables: { id: this.props.id } }
        ]}
      >
        {(createLogMove, { loading, error }) => {
          {
            if (this.state.show)
              return (
                <section className="content">
                  <StyledForm
                    onSubmit={e => {
                      e.preventDefault();
                      createLogMove();
                      this.setState({ name: "", weight: [], reps: [] });
                    }}
                  >
                    <fieldset disabled={loading} aria-busy={loading}>
                      <h2>Add New Movement</h2>
                      <label>Name of Movement</label>
                      <input
                        name="name"
                        type="string"
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                      <InputContainer>
                        <label>Weight Used </label>
                        <label>Reps</label>
                        <div>{weights}</div>
                        <div>{reps}</div>
                        <SubmitButton
                          type="button"
                          onClick={this.handleNewMovement}
                        >
                          Add Set
                        </SubmitButton>
                        <SubmitButton type="submit">
                          Submit Movement
                        </SubmitButton>
                      </InputContainer>
                    </fieldset>
                  </StyledForm>
                  <SubmitButton
                    onClick={e => {
                      e.preventDefault();
                      this.setState({ show: !this.state.show });
                    }}
                  >
                    Hide
                  </SubmitButton>
                </section>
              );
            else
              return (
                <div>
                  <SubmitButton
                    onClick={e => {
                      e.preventDefault();
                      this.setState({ show: !this.state.show });
                    }}
                  >
                    Add New Movement
                  </SubmitButton>
                </div>
              );
          }
        }}
      </Mutation>
    );
  }
}

export default AddMovement;
