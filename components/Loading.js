import React from "react";
import { Circle } from "./styles/Loading";

const LoadingIcon = () => {
  return (
    <Circle>
      <div className="circle" />
      <div className="circle" />
    </Circle>
  );
};

export default LoadingIcon;
