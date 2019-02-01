import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import { removeArgumentsFromDocument } from "apollo-utilities";
import Router from "next/router";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = props => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {signout => (
      <a
        style={{ marginRight: "20px" }}
        onClick={e => {
          signout();
          Router.push("/");
        }}
      >
        Sign Out
      </a>
    )}
  </Mutation>
);
export default Signout;
