import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";

const MoveForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ADD_TO_LOG_MUTATION = gql`
  mutation ADD_TO_LOG_MUTATION($name: String!, $weights: [Int], $reps: [Int]) {
    addlogmove(name: $name, weights: [$weights], reps: [$reps]) {
      id
    }
  }
`;

class AddMovement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      weights: [""],
      reps: [""]
    };
    this.handleNewMovement = this.handleNewMovement.bind(this);
  }

  handleChangeWeight = e => {
    e.preventDefault();
    const index = Number(e.target.name.split("-")[1]);
    const weight = this.state.weights.map((weight, i) =>
      i === index ? e.target.value : weight
    );
    this.setState({ weights: weight });
  };
  handleChangeReps = e => {
    e.preventDefault();
    const index = Number(e.target.name.split("-")[1]);
    const reps = this.state.reps.map((rep, i) =>
      i === index ? e.target.value : rep
    );
    this.setState({ reps: reps });
  };
  handleNewMovement(e) {
    e.preventDefault();
    const { weights, reps } = this.state;
    this.setState({
      weights: [...weights, weights[weights.length - 1]],
      reps: [...reps, reps[reps.length - 1]]
    });
  }
  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const weights = this.state.weights.map((weight, i) => (
      <input
        name={`weight-${i}`}
        type="number"
        value={weight}
        onChange={this.handleChangeWeight}
      />
    ));
    const reps = this.state.reps.map((reps, i) => (
      <input
        name={`reps-${i}`}
        type="number"
        value={reps}
        onChange={this.handleChangeReps}
      />
    ));
    return (
      <MoveForm>
        <label>Name of Movement</label>
        <input
          name="name"
          type="string"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label>Weight Used </label>
        <label>Reps</label>
        {weights}
        {reps}
        <button type="button" onClick={this.handleNewMovement}>
          add Sets
        </button>
      </MoveForm>
    );
  }
}

export default AddMovement;
