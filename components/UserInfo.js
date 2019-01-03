import React from "react";
import { Query, Mutation } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";

class UserInfo extends React.Component {
  state = {
    benchPress: 0,
    squat: 0,
    deadLift: 0,
    press: 0
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Query query={CURRENT_USER_QUERY} variables={this.state}>
        {({ data, loading }) => (
          <form method="post">
            <fieldset>
              <label htmlFor="benchPress">Bench Press</label>
              <input
                type="number"
                onChange={this.handleChange}
                defaultValue={data.me.benchPress}
                name="benchPress"
              />
              <label htmlFor="deadLift">Deadlift</label>
              <input
                type="number"
                onChange={this.handleChange}
                defaultValue={data.me.deadLift}
                name="deadLift"
              />
              <label htmlFor="press">Overhead Press</label>
              <input
                type="number"
                onChange={this.handleChange}
                defaultValue={data.me.press}
                name="press"
              />
              <label htmlFor="squat">Squat</label>
              <input
                type="number"
                onChange={this.handleChange}
                defaultValue={data.me.squat}
                name="squat"
              />
              <button type="submit">Submit</button>
            </fieldset>
          </form>
        )}
      </Query>
    );
  }
}

export default UserInfo;
