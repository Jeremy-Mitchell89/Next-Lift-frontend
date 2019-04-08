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
    @media (max-width: 800px) {
      font-size: 10px;
      padding: 0 10px;
    }
  }
  :hover {
    cursor: pointer;
  }
`;

// const NavStyles = styled.ul`
//   margin: 0;
//   padding: 0;
//   display: flex;
//   justify-self: end;
//   font-size: 2rem;
//   a {
//     padding: 1rem 3rem;
//     display: flex;
//     align-items: center;
//     position: relative;
//     text-transform: uppercase;
//     font-weight: 900;
//     font-size: 1em;
//     background: none;
//     border: 0;
//     cursor: pointer;
//     color: ${props => props.theme.black};
//     font-weight: 800;
//     @media (max-width: 700px) {
//       font-size: 10px;
//       padding: 0 10px;
//     }
//     &:before {
//       content: "";
//       width: 2px;
//       background: ${props => props.theme.lightgrey};
//       height: 100%;
//       left: 0;
//       position: absolute;
//       transform: skew(-20deg);
//       top: 0;
//       bottom: 0;
//     }
//     &:after {
//       height: 2px;
//       background: red;
//       content: "";
//       width: 0;
//       position: absolute;
//       transform: translateX(-50%);
//       transition: width 0.4s;
//       transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
//       left: 50%;
//       margin-top: 2rem;
//     }
//     &:hover,
//     &:focus {
//       outline: none;
//       &:after {
//         width: calc(100% - 60px);
//       }
//     }
//   }
//   @media (max-width: 1300px) {
//     border-top: 1px solid ${props => props.theme.lightgrey};
//     width: 100%;
//     justify-content: center;
//     font-size: 1.5rem;
//   }
// `;

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
                  <a>User Info</a>
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
