import React from "react";
import gql from "graphql-tag";
import StyledForm from "./styles/StyledForm";
import { Mutation } from "react-apollo";
import Router from "next/router";

const CREATE_MOVEMENT_MUTATION = gql`
  mutation CREATE_MOVEMENT_MUTATION(
    $name: String!
    $description: String!
    $primaryMuscleWorked: String!
    $secondaryMuscleWorked: String
  ) {
    createMove(
      name: $name
      description: $description
      primaryMuscleWorked: $primaryMuscleWorked
      secondaryMuscleWorked: $secondaryMuscleWorked
    ) {
      id
    }
  }
`;

class CreateMovement extends React.Component {
  state = {
    name: "",
    description: "",
    primaryMuscleWorked: "",
    secondaryMuscleWorked: ""
  };
  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation mutation={CREATE_MOVEMENT_MUTATION} variables={this.state}>
        {(createMove, { loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{error.message}</p>;
          return (
            <StyledForm
              onSubmit={async e => {
                e.preventDefault();
                const res = await createMove();
                Router.push({
                  pathname: "/movements"
                  // query: { id: res.data.createMove.id }
                });
              }}
            >
              <h1>Create a New Movement</h1>
              <fieldset>
                <input
                  required
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <textarea
                  required
                  rows="3"
                  name="description"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <select
                    required
                    name="primaryMuscleWorked"
                    value={this.state.primaryMuscleWorked}
                    onChange={this.handleChange}
                  >
                    <option defaultValue>Chose Primary Muscle</option>
                    <option>Chest</option>
                    <option>Back</option>
                    <option>Quads</option>
                    <option>Hamstrings</option>
                    <option>Calf</option>
                    <option>Abs</option>
                    <option>Shoulders</option>
                    <option>Biceps</option>
                    <option>Triceps</option>
                  </select>
                  <select
                    name="secondaryMuscleWorked"
                    value={this.state.secondaryMuscleWorked}
                    onChange={this.handleChange}
                  >
                    <option defaultValue>Chose Secondary Muscle</option>
                    <option>Chest</option>
                    <option>Back</option>
                    <option>Quads</option>
                    <option>Hamstrings</option>
                    <option>Calf</option>
                    <option>Abs</option>
                    <option>Shoulders</option>
                    <option>Biceps</option>
                    <option>Triceps</option>
                  </select>
                </div>
                <button type="submit">Submit</button>
              </fieldset>
            </StyledForm>
          );
        }}
      </Mutation>
    );
  }
}

export default CreateMovement;
