import React from "react";
import styled from "styled-components";
import Link from "next/link";
import DeleteLog from "./DeleteLog";
import { format, parse } from "date-fns";
import { StyledSecondaryButton, StyledButton } from "./styles/Inputs";

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 0px;
  border-bottom: 3px solid #333;
  justify-items: center;
  h3 {
    height: 100%;
    margin: 0;
  }
`;

class Log extends React.Component {
  render() {
    return (
      <div>
        <ContainerLabels>
          <h3>Date of Log</h3>
          <h3>Title of Log</h3>
          <h3>Notes</h3>
          <h3>Action</h3>
        </ContainerLabels>
        <Content>
          <div>
            <p>{format(parse(this.props.log.createdAt), "MM/DD/YYYY")}</p>
          </div>
          <div>
            <p>{this.props.log.title}</p>
          </div>
          <div>
            <p>{this.props.log.notes}</p>
          </div>
          <div>
            <Link href={{ pathname: "log", query: { id: this.props.log.id } }}>
              <StyledSecondaryButton>Edit</StyledSecondaryButton>
            </Link>
            <StyledButton id={this.props.log.id}>Delete Log</StyledButton>
          </div>
        </Content>
      </div>
    );
  }
}

export default Log;
