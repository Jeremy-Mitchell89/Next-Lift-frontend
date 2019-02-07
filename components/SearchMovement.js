import React from "react";
import Downshift, { resetIdCounter } from "downshift";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import styled from "styled-components";

const SearchStyles = styled.div`
  position: relative;
  input {
    width: 100%;
    padding: 10px;
    border: 0;
    &.loading {
      animation: 0.5s ease-in-out infinite alternate;
    }
  }
`;

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 99;
  border: 1px solid black;
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  background: ${props => (props.highlighted ? "#f9efcf" : "white")};
  padding: 1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? "padding-left: 2rem;" : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid
    ${props => (props.highlighted ? props.theme.lightgrey : "white")};
  img {
    margin-right: 10px;
  }
`;

const SEARCH_MOVEMENTS_QUERY = gql`
  query SEARCH_MOVEMENTS_QUERY($searchTerm: String!) {
    movements(where: { name_contains: $searchTerm }) {
      id
      name
    }
  }
`;

class SearchMovement extends React.Component {
  state = { movements: [], loading: false, name: "" };
  onChange = debounce(async (e, client) => {
    this.setState({ loading: true });
    const res = await client.query({
      query: SEARCH_MOVEMENTS_QUERY,
      variables: { searchTerm: e.target.value }
    });
    this.setState({ movements: res.data.movements, loading: false });
  }, 350);
  render() {
    resetIdCounter();
    return (
      <SearchStyles>
        <Downshift
          itemToString={movement => (movement === null ? "" : movement.name)}
          onInputValueChange={e => {
            this.props.passValUp(e);
          }}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex,
            onInputValueChange
          }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <input
                    {...getInputProps({
                      type: "search",
                      placeholder: "Search For A Movement",
                      id: "search",

                      onChange: e => {
                        this.props.passValUp(e.target.value);
                        e.persist();
                        this.onChange(e, client);
                      }
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {this.state.movements.map((movement, i) => (
                    <DropDownItem
                      key={movement.id}
                      {...getItemProps({ item: movement })}
                      highlighted={i === highlightedIndex}
                    >
                      {movement.name}
                    </DropDownItem>
                  ))}{" "}
                  {!this.state.movements.length && !this.state.loading && (
                    <DropDownItem> Nothing Found For {inputValue}</DropDownItem>
                  )}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    );
  }
}

export default SearchMovement;
