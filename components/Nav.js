import React from "react";
import Link from "next/link";
import styled from "styled-components";
import User, { CURRENT_USER_QUERY } from "./User";
import Signout from "./Signout";

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  background-color: transparent;
  a {
    color: #333;
    text-decoration: none;
    padding: 1rem 1.8rem;
    font-size: 2rem;
    border-left: 3px solid #333;
    transform: skew(-20deg);
  }
  :hover {
    cursor: pointer;
  }
`;

class Nav extends React.Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <NavStyles>
            {me && (
              <>
                <Link href="/movements">
                  <a>Movements</a>
                </Link>
                <Link href="/newmovement">
                  <a>New Movement</a>
                </Link>
                <Link href="/newlog">
                  <a>Create New Log</a>
                </Link>
                <Link href="/logs">
                  <a>View My Logs</a>
                </Link>
                <Link href="/account">
                  <a>Account</a>
                </Link>
                <Signout />
              </>
            )}
            {!me && (
              <Link href="/signup">
                <a>Signup/Sign In</a>
              </Link>
            )}
          </NavStyles>
        )}
      </User>
    );
  }
}

export default Nav;
