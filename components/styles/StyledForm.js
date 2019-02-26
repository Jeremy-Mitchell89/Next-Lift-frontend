import styled from "styled-components";

const StyledForm = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid black;
    margin: 0.5rem;
    border-radius: 3px;
  }
  textarea:focus,
  textarea:hover {
    outline: none;
    border-bottom: 2px solid #f44336;
  }
  h1 {
    text-align: center;
  }
  fieldset {
    border: 0;
    padding: 0;
    width: 50%;
    margin: 0 auto;
  }
`;

const StyledFormNewLog = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  border: 5px solid white;
  padding: 20px;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid black;
    margin: 0.5rem;
    border-radius: 3px;
  }
  input:focus,
  textarea:focus,
  select:focus {
    border-bottom: 2px solid #f44336;
    outline: none;
  }
  select:focus {
    outline: none;
    opacity: 1.1;
  }
  h1 {
    text-align: center;
  }
  fieldset {
    opacity: 1;
    background-color: white;
    border: 0;
    padding: 0;
    width: 50%;
    margin: 0 auto;
  }
`;

const StyledFormAddMovement = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  border: 5px solid white;
  padding: 20px;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid black;
    margin: 0.5rem;
    border-radius: 3px;
  }
  input[type="number"] {
    width: 70%;
    justify-self: center;
  }
  select:focus {
    outline: none;
    opacity: 1.1;
  }
  h1 {
    text-align: center;
  }
  fieldset {
    border: 0;
    padding: 0;
    width: 50%;
    margin: 0 auto;
    opacity: 1;
  }
  ul {
    margin-left: 0;
    padding-left: 0;
  }
  li {
    list-style-type: none;
  }
`;

export { StyledFormAddMovement, StyledFormNewLog };
export default StyledForm;
