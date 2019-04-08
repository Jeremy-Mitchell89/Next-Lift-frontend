import React from "react";
import styled from "styled-components";
import Nav from "./Nav";
import NProgress from "nprogress";
import Router from "next/router";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Logo = styled.h1`
  padding: 0;
  margin: 0;
  font-size: 3.8rem;

  img {
    max-width: 40px;
  }
  a {
    text-decoration: none;
    color: #333;
    @media (max-width: 1300px) {
      display: none;
    }
    @media (max-width: 700px) {
      display: none;
    }
  }
`;

const StyledHeader = styled.header`
  .bar {
    display: flex;
    justify-content: space-between;
    border-bottom: 10px solid #333;
    @media (max-width: 1300px) {
      justify-content: flex-start;
    }
  }
`;

class Header extends React.Component {
  render() {
    return (
      <StyledHeader>
        <div className="bar">
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
