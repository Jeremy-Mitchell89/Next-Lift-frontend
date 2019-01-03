import React from "react";
import PleaseSignIn from "../components/PleaseSignIn";
import UserInfo from "../components/UserInfo";

class AccountPage extends React.Component {
  render() {
    return (
      <div>
        <PleaseSignIn>
          <UserInfo />
        </PleaseSignIn>
      </div>
    );
  }
}

export default AccountPage;
