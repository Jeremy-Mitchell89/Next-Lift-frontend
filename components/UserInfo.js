import React from "react";
import { Query, Mutation } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import gql from "graphql-tag";
import StyledForm from "./styles/StyledForm";

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
                  <StyledForm
                    method="post"
                    onSubmit={async e => {
                      e.preventDefault();
                      await updateLifts();
                    }}
                  >
                    <fieldset disabled={loading} aria-busy={loading}>
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
