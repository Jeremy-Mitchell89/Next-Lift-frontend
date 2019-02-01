import React from "react";
import { Query, Mutation } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import gql from "graphql-tag";
import WeightForm from "./CreateWeight";
import styled from "styled-components";
import Weights from "./Weights";

const StyledForm = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  line-height: 1.5;
  font-weight: 600;
  margin: 0 auto;
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
    padding: 10px 15px 10px 15px;
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
`;

const UPDATE_LIFTS_MUTATION = gql`
  mutation UPDATE_LIFTS_MUTATION(
    $benchPress: Int
    $deadLift: Int
    $press: Int
    $squat: Int
  ) {
    updateLifts(
      benchPress: $benchPress
      deadLift: $deadLift
      press: $press
      squat: $squat
    ) {
      benchPress
      deadLift
      press
      squat
    }
  }
`;

class UserInfo extends React.Component {
  state = {};
  handleChange = e => {
    const val = parseInt(e.target.value);
    this.setState({ [e.target.name]: val });
  };
  updateLift = async (e, updateLiftMutation) => {
    e.preventDefault();
    console.log(this.state);
    const res = await updateLiftMutation({
      variables: { ...this.state }
    });
    console.log(res);
  };
  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
          {
            if (loading) return <p>Loading...</p>;
          }
          return (
            <Mutation mutation={UPDATE_LIFTS_MUTATION} variables={this.state}>
              {(updateLifts, { loading, error }) => {
                {
                  if (loading) return <p>Loading...</p>;
                }
                return (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr"
                    }}
                  >
                    <div>
                      <WeightForm />
                      <StyledForm
                        method="post"
                        onSubmit={async e => {
                          e.preventDefault();
                          await updateLifts();
                        }}
                      >
                        <fieldset disabled={loading} aria-busy={loading}>
                          <h1>{data.me.name}'s Information</h1>
                          <label htmlFor="benchPress">Bench Press:</label>
                          <input
                            type="number"
                            onChange={this.handleChange}
                            defaultValue={data.me.benchPress}
                            name="benchPress"
                          />
                          <label htmlFor="deadLift">Deadlift:</label>
                          <input
                            type="number"
                            onChange={this.handleChange}
                            defaultValue={data.me.deadLift}
                            name="deadLift"
                          />
                          <label htmlFor="press">Overhead Press:</label>
                          <input
                            type="number"
                            onChange={this.handleChange}
                            defaultValue={data.me.press}
                            name="press"
                          />
                          <label htmlFor="squat">Squat:</label>
                          <input
                            type="number"
                            onChange={this.handleChange}
                            defaultValue={data.me.squat}
                            name="squat"
                          />
                          <button type="submit">
                            Sav{loading ? "ing" : "e"} Changes
                          </button>
                        </fieldset>
                      </StyledForm>
                    </div>
                    <div>
                      <Weights />
                    </div>
                  </div>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UserInfo;
export { CURRENT_USER_QUERY };
