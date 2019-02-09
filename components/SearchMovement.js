import React from "react";
import Downshift, { resetIdCounter } from "downshift";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import { SearchStyles, DropDown, DropDownItem } from "./styles/Search";

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
            highlightedIndex
          }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <input
                    required
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
