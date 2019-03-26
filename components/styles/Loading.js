import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Circle = styled.div`
  animation: ${rotate} 1s linear infinite;
  width: 18px;
  height: 18px;
  box-sizing: border-box;
  border: solid 2px transparent;
  border-top-color: red;
  border-left-color: red;
  border-radius: 50%;
  margin-left: 10px;
  display: inline-block;
`;

export { Circle };
