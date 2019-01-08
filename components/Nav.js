import React from "react";
import Link from "next/link";
import styled from "styled-components";
import User, { CURRENT_USER_QUERY } from "./User";

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  background-color: transparent;
  a {
    text-decoration: none;
    color: black;
    padding: 1rem 2rem;
    font-size: 2rem;
    border-left: 3px solid black;
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
                  <a>Create New Movement</a>
                </Link>
                <Link href="/log">
                  <a>Create New Log</a>
                </Link>
                <Link href="/account">
                  <a>Account</a>
                </Link>
              </>
            )}
            {!me && (
              <Link href="/signup">
                <a>Signup</a>
              </Link>
            )}
          </NavStyles>
        )}
      </User>
    );
  }
}

export default Nav;
