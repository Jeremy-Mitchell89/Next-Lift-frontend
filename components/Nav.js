import React from "react";
import Link from "next/link";
import styled from "styled-components";

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
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
      <NavStyles>
        <Link href="/signup">
          <a>Signup</a>
        </Link>
        <Link href="/log">
          <a>Create New Log</a>
        </Link>
        <Link href="/movements">
          <a>Movements</a>
        </Link>
      </NavStyles>
    );
  }
}

export default Nav;
