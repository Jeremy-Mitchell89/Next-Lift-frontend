import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Meta from "./Meta";
import Header from "./Header";

const theme = {};

const StyledPage = styled.div``;

const Content = styled.div`
  padding: 0 3%;
`;

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
            <Content>{this.props.children}</Content>
          </Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
