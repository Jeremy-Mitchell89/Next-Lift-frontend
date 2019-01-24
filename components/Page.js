import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Meta from "./Meta";
import Header from "./Header";

const theme = {};

const StyledPage = styled.div``;

const Inner = styled.div`
  margin: 0 0;
  padding: 0;
`;

class Page extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Inner>
            <Meta />
            <Header />
            {this.props.children}
          </Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
