import React from "react";
import styled from "styled-components";
import Link from "next/link";
import DeleteLog from "./DeleteLog";

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 0px;
  margin: 0 auto;
  text-align: center;
  align-self: center;
  p {
    padding: 0;
  }
`;
const ContainerLabels = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 0px;
  border-bottom: 3px solid black;
  justify-items: center;
  h3 {
    height: 100%;
    margin: 0;
  }
`;

const EditButton = styled.a`
  margin: 10px;
  top: 50%;
  font-size: 1.5rem;
  padding: 10px 15px 10px 15px;
  background-color: rgb(244, 152, 65);
  :hover {
  }
  border-radius: 10px;
  cursor: pointer;
`;

class Log extends React.Component {
  render() {
    return (
      <div>
        <ContainerLabels>
          <h3>Title of Log</h3>
          <h3>Notes</h3>
          <h3>Action</h3>
        </ContainerLabels>
        <Content>
          <div>
            <p>{this.props.log.title}</p>
          </div>
          <div>
            <p>{this.props.log.notes}</p>
          </div>
          <div>
            <Link href={{ pathname: "log", query: { id: this.props.log.id } }}>
              <EditButton>Edit</EditButton>
            </Link>
            <DeleteLog id={this.props.log.id} />
          </div>
        </Content>
      </div>
    );
  }
}

export default Log;
