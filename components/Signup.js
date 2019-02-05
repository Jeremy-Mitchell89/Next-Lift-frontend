import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

class Signup extends React.Component {
  state = {
    email: "",
    name: "",
    password: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    await signup();
    this.setState({ email: "", name: "", password: "" });
    Router.push({ pathname: "/newlog" });
  };
  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, { error, loading }) => (
          <form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await signup();
              this.setState({ email: "", name: "", password: "" });
            }}
          >
            <fieldset disabled={loading} aria-disabled={loading}>
              <h2>Signup for an account</h2>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <button type="submit">Submit</button>
            </fieldset>
          </form>
        )}
      </Mutation>
    );
  }
}

export default Signup;
