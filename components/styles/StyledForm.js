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
    background-color: #e8eeef;
    border-radius: 3px;
  }
  input:focus,
  textarea:focus,
  select:focus {
    background-color: #b7bbbc;
    outline: none;
  }
  select:focus {
    outline: none;
    opacity: 1.1;
  }
  button:focus,
  button:hover {
    outline: none;
    background-color: rgb(0, 100, 0);
  }
  h1 {
    text-align: center;
  }
  button,
  input[type="submit"] {
    margin: 10px;
    top: 50%;
    font-size: 1.5rem;
    padding: 10px 15px 10px 15px;
    background-color: rgb(0, 160, 0);
    :hover {
    }
    border-radius: 10px;
    cursor: pointer;
  }
  fieldset {
    border: 0;
    padding: 0;
    width: 50%;
    margin: 0 auto;
  }
  button {
    color: #e2e2e2;
  }
`;

const StyledFormAddMovement = styled.form`
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
    background-color: #e8eeef;
    border-radius: 3px;
  }
  input[type="number"] {
    width: 70%;
    justify-self: center;
  }
  input:focus,
  textarea:focus,
  select:focus {
    background-color: #b7bbbc;
    outline: none;
  }
  select:focus {
    outline: none;
    opacity: 1.1;
  }
  button:focus,
  button:hover {
    outline: none;
    background-color: rgb(0, 100, 0);
  }
  h1 {
    text-align: center;
  }
  button,
  input[type="submit"] {
    margin: 10px;
    top: 50%;
    font-size: 1.5rem;
    padding: 5px;
    background-color: rgb(0, 160, 0);
    :hover {
    }
    border-radius: 10px;
    cursor: pointer;
  }
  fieldset {
    border: 0;
    padding: 0;
    width: 50%;
    margin: 0 auto;
  }
  button {
    color: #e2e2e2;
  }
  ul {
    margin-left: 0;
    padding-left: 0;
  }
  li {
    list-style-type: none;
  }
`;
const SubmitButton = styled.button`
  max-height: 70px;
  top: 50%;
  font-size: 1.2rem;
  margin: 25px;
  background-color: rgb(244, 152, 65);
  color: #ffffff;
  :hover {
    background-color: #f98211;
    outline: none;
  }
  border-radius: 10px;
  cursor: pointer;
  :focus {
    outline: none;
  }
`;
export { StyledFormAddMovement, SubmitButton };
export default StyledForm;
