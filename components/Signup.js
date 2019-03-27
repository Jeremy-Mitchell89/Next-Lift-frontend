import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { SignUp, StyledButton } from "./styles/Inputs";
import LoadingIcon from "./Loading";

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
          <SignUp
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await signup();
              this.setState({ email: "", name: "", password: "" });
            }}
          >
            <fieldset disabled={loading} aria-disabled={loading}>
              <h2>Sign up for an account</h2>
              <input
                label="Email"
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <input
                label="Name"
                type="text"
                name="name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <input
                label="Password"
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <StyledButton variant="contained" color="primary" type="submit">
                Sign Up
              </StyledButton>
              {loading ? <LoadingIcon /> : null}
            </fieldset>
          </SignUp>
        )}
      </Mutation>
    );
  }
}

export default Signup;
