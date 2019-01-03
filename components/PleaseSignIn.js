import React from "react";
import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Signin from "./Signin";

class PleaseSignIn extends React.Component {
  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.me) {
            return (
              <div>
                <p>Please Sign in before continuing</p>
                <Signin />
              </div>
            );
          }
          return this.props.children;
        }}
      </Query>
    );
  }
}
export default PleaseSignIn;
