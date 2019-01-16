import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { LOG_DETAILS_QUERY } from "./LogDetails";

const InputContainer = styled.div`
  width: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const SubmitButton = styled.button`
  border: 1px solid;
  background: none;
  vertical-align: middle;
  margin: 1em;
  padding: 1rem 2 rem;
  max-width: 250px;
  min-width: 150px;
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
      weight: [0],
      reps: [0],
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
      <input
        key={i}
        name={`weight-${i}`}
        type="number"
        value={weight}
        onChange={this.handleChangeWeight}
      />
    ));
    const reps = this.state.reps.map((reps, i) => (
      <input
        key={i}
        name={`reps-${i}`}
        type="number"
        value={reps}
        onChange={this.handleChangeReps}
      />
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
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      createLogMove();
                    }}
                  >
                    <fieldset>
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
                          Add Sets
                        </SubmitButton>
                        <SubmitButton type="submit">
                          Submit Movement
                        </SubmitButton>
                      </InputContainer>
                    </fieldset>
                  </form>
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
