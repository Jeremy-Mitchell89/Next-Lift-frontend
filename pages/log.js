import React from "react";
import LogDetails from "../components/LogDetails";

const logdetail = ({ query }) => (
  <div>
    <LogDetails id={query.id} />
  </div>
);

export default logdetail;
