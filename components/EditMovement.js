import React from "react";
import gql from "graphql-tag";
import StyledForm from "./styles/StyledForm";
import { Mutation, Query } from "react-apollo";
import Router from "next/router";
import Error from "./ErrorMessage";

const MOVEMENT_QUERY = gql`
  query MOVEMENT_QUERY($id: ID!) {
    movement(where: { id: $id }) {
      id
      name
      description
      primaryMuscleWorked
      secondaryMuscleWorked
    }
  }
`;

const UPDATE_MOVEMENT_MUTATION = gql`
  mutation UPDATE_MOVEMENT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $primaryMuscleWorked: String
    $secondaryMuscleWorked: String
  ) {
    updateMovement(
      id: $id
      name: $name
      description: $description
      primaryMuscleWorked: $primaryMuscleWorked
      secondaryMuscleWorked: $secondaryMuscleWorked
    ) {
      id
      name
      description
      primaryMuscleWorked
      secondaryMuscleWorked
    }
  }
`;

class EditMovement extends React.Component {
  state = {};
  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Query query={MOVEMENT_QUERY} variables={{ id: this.props.id }}>
        {({ data, error, loading }) => (
          <Mutation
            mutation={UPDATE_MOVEMENT_MUTATION}
            variables={{ id: this.props.id, ...this.state }}
          >
            {(updateMovement, { loading, error }) => {
              return (
                <StyledForm
                  onSubmit={async e => {
                    e.preventDefault();
                    const res = await updateMovement();
                    console.log(res);
                    // Router.push({
                    //   pathname: "/movements"
                    //   // query: { id: res.data.updateMovement.id }
                    // });
                  }}
                >
                  <Error error={error} />
                  <h1>Update Movement</h1>
                  <fieldset>
                    <input
                      required
                      name="name"
                      placeholder="Name"
                      defaultValue={data.movement.name}
                      onChange={this.handleChange}
                    />
                    <textarea
                      required
                      rows="3"
                      name="description"
                      placeholder="Description"
                      defaultValue={data.movement.description}
                      onChange={this.handleChange}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <select
                        required
                        name="primaryMuscleWorked"
                        defaultValue={data.movement.primaryMuscleWorked}
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
                        defaultValue={data.movement.secondaryMuscleWorked}
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
                    <button type="submit">
                      Sav{loading ? "ing" : "e"} Changes
                    </button>
                  </fieldset>
                </StyledForm>
              );
            }}
          </Mutation>
        )}
      </Query>
    );
  }
}

export default EditMovement;
