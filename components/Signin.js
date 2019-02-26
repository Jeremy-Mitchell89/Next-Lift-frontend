import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Router from "next/router";
import { SignIn, StyledButton } from "./styles/Inputs";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

class Signin extends React.Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { loading, error }) => {
          {
            if (loading) return <p>Loading...</p>;
          }
          return (
            <SignIn
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await signin();
                this.setState({ email: "", password: "" });
                Router.push({ pathname: "/newlog" });
              }}
            >
              <fieldset disabled={loading} aria-disabled={loading}>
                <div id="header-backdrop">
                  <h2>Log in</h2>
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <StyledButton type="submit">Log In</StyledButton>
              </fieldset>
            </SignIn>
          );
        }}
      </Mutation>
    );
  }
}

export default Signin;
