import React from "react";
import styled from "styled-components";
import Link from "next/link";

const StyledItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  background-color: white;
  border-bottom: 1px solid black;
`;

class Log extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.log.title}</p>
        <p>{this.props.log.notes}</p>
        <Link href={{ pathname: "log", query: { id: this.props.log.id } }}>
          <a>Edit</a>
        </Link>
      </div>
    );
  }
}

export default Log;
