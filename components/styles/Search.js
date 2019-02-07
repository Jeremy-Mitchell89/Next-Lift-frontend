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

export { SearchStyles, DropDown, DropDownItem };
