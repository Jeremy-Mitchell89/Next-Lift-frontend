import React from "react";
import { Query, Mutation } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import gql from "graphql-tag";
import WeightForm from "./CreateWeight";
import styled from "styled-components";
import Weights from "./Weights";
import { StyledInput, StyledButton } from "./styles/Inputs";

const StyledForm = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
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
  }
  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }
  select:focus {
    outline: none;
    opacity: 1.1;
  }

  h1 {
    text-align: center;
  }

  fieldset {
    border: 0;
    padding: 0;
    width: 50%;
    margin: 0 auto;
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
                          <StyledInput
                            type="number"
                            onChange={this.handleChange}
                            defaultValue={data.me.benchPress}
                            name="benchPress"
                          />
                          <label htmlFor="deadLift">Deadlift:</label>
                          <StyledInput
                            type="number"
                            onChange={this.handleChange}
                            defaultValue={data.me.deadLift}
                            name="deadLift"
                          />
                          <label htmlFor="press">Overhead Press:</label>
                          <StyledInput
                            type="number"
                            onChange={this.handleChange}
                            defaultValue={data.me.press}
                            name="press"
                          />
                          <label htmlFor="squat">Squat:</label>
                          <StyledInput
                            type="number"
                            onChange={this.handleChange}
                            defaultValue={data.me.squat}
                            name="squat"
                          />
                          <StyledButton type="submit">
                            Sav{loading ? "ing" : "e"} Changes
                          </StyledButton>
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
