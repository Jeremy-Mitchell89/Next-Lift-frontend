import styled from "styled-components";

const StyledInput = styled.input`
  width: 90%;
  margin-top: 20px;
  :hover,
  :focus {
    outline: none;
    border-bottom: 2px solid #f44336;
  }
`;

const SignIn = styled.form`
  border: 1px solid black;
  border-radius: 4px;
  margin: 0 auto;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 300px;
  flex-shrink: 1;
  input {
    border: none;
    border-bottom: 1px solid black;
    width: 90%;
    margin-top: 20px;
  }
  input:focus {
    outline: none;
    border-bottom: 2px solid #f44336;
  }

  fieldset {
    border: none;
  }
`;
const StyledButton = styled.button`
  margin: 20px 0 20px 0;
  background-color: #f44336;
  padding: 6px 16px;
  color: #fff;
  border: none;
  cursor: pointer;
  outline: inherit;
  text-transform: uppercase;
  border-radius: 4px;
  font-size: 0.9rem;
  line-height: 1.75;
  :hover,
  :focus {
    background-color: #d32f2f;
  }
`;

const StyledSecondaryButton = styled.button`
  margin: 20px 10px 20px 10px;
  border: 1px solid #d32f2f;
  padding: 6px 16px;
  color: #d32f2f;
  cursor: pointer;
  outline: inherit;
  text-transform: uppercase;
  border-radius: 4px;
  font-size: 0.9rem;
  line-height: 1.75;
  background-color: white;
  transition: background-color 0.2s ease-in;
  :hover,
  :focus {
    background-color: #ffcdd2;
  }
`;

const StyledTextButton = styled.button`
  margin: 20px 0 20px 0;
  padding: 6px 16px;
  color: #d32f2f;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  text-transform: uppercase;
  border-radius: 4px;
  border: none;
  font-size: 0.9rem;
  line-height: 1.75;
  background-color: white;
  transition: background-color 0.2s ease-in;
  :hover {
    background-color: #ffcdd2;
  }
`;

const SignUp = styled.form`
  border: 1px solid black;
  margin: 0 auto;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 1;
  min-width: 300px;
  border-radius: 4px;
  input {
    border: none;
    border-bottom: 1px solid black;
    width: 90%;
    margin-top: 20px;
  }
  input:focus {
    outline: none;
    border-bottom: 2px solid #f44336;
  }
  fieldset {
    border: none;
  }
`;

const StyledSelect = styled.select`
  margin-top: 2%;
  margin-right: 1%;
  border: none;
  border-bottom: 1px solid black;
  :focus,
  :hover {
    outline: none;
    border-bottom: 2px solid #f44336;
  }
`;
const SubmitButton = styled.button`
  max-height: 70px;
  top: 50%;
  font-size: 0.9rem;
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

export {
  SignIn,
  SignUp,
  StyledButton,
  StyledSelect,
  SubmitButton,
  StyledSecondaryButton,
  StyledTextButton,
  StyledInput
};
