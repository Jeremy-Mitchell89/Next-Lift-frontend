import React from "react";
import styled from "styled-components";
import Nav from "./Nav";
import Link from "next/link";

const Logo = styled.h1`
  padding: 0px;
  margin: 0;
  font-size: 4rem;
  img {
    max-width: 50px;
  }
  a {
    text-decoration: none;
    color: #333;
  }
`;

const StyledHeader = styled.header`
  .Navbar {
    display: flex;
    justify-content: space-between;
    border-bottom: 10px solid #333;
  }
`;

class Header extends React.Component {
  render() {
    return (
      <StyledHeader>
        <div className="Navbar">
          <Logo>
            <a>
              <img src="../static/barbell.png" alt="barbell icon" />
              Lift Log
            </a>
          </Logo>
          <Nav />
        </div>
      </StyledHeader>
    );
  }
}

export default Header;
