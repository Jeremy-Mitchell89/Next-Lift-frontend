import React from "react";
import { StyledFormAddMovement } from "./styles/StyledForm";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Router from "next/router";
import Link from "next/link";
import { LOG_DETAILS_QUERY } from "./LogDetails";
import {
  StyledInput,
  StyledButton,
  StyledSecondaryButton
} from "./styles/Inputs";

const EDIT_LOGMOVE_MUTATION = gql`
  mutation EDIT_LOGMOVE_MUTATION($id: ID!, $weight: [Int], $reps: [Int]) {
    editLogMove(id: $id, weight: $weight, reps: $reps) {
      name
    }
  }
`;

class EditLogMove extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: [],
      reps: []
    };
    this.handleNewMovement = this.handleNewMovement.bind(this);
  }
  componentWillMount() {
    if (typeof this.props.weight === "string") {
      this.setState({
        weight: [Number(this.props.weight)],
        reps: [Number(this.props.reps)]
      });
      console.log(this.state);
    } else {
      let weightNumbers = [];
      let repNumbers = [];
      this.props.weight.map(weight => weightNumbers.push(Number(weight)));
      this.props.reps.map(reps => repNumbers.push(Number(reps)));
      this.setState({ weight: weightNumbers, reps: repNumbers });
    }
  }
  handleChangeWeight = e => {
    e.preventDefault();
    const index = Number(e.target.name.split("-")[1]);
    const weight = this.state.weight.map((weight, i) =>
      i === index ? Number(e.target.value) : weight
    );
    this.setState({ weight: weight });
  };
  handleChangeReps = e => {
    e.preventDefault();
    const index = Number(e.target.name.split("-")[1]);
    const reps = this.state.reps.map((rep, i) =>
      i === index ? Number(e.target.value) : rep
    );
    this.setState({ reps: reps });
  };
  handleNewMovement(e) {
    e.preventDefault();
    const { weight, reps } = this.state;
    this.setState({
      weight: [...weight, weight[weight.length - 1]],
      reps: [...reps, reps[reps.length - 1]]
    });
  }
  render() {
    const weights = this.state.weight.map((weight, i) => (
      <div key={i} style={{ display: "flex" }}>
        <div>
          <li>
            {i + 1}.
            <StyledInput
              key={i}
              name={`weight-${i}`}
              type="number"
              value={weight}
              onChange={this.handleChangeWeight}
            />
          </li>
        </div>
        <div>
          <li>
            <StyledInput
              key={i}
              name={`reps-${i}`}
              type="number"
              value={this.state.reps[i]}
              onChange={this.handleChangeReps}
            />
          </li>
        </div>
      </div>
    ));

    return (
      <Mutation
        mutation={EDIT_LOGMOVE_MUTATION}
        variables={{
          id: this.props.id,
          reps: this.state.reps,
          weight: this.state.weight
        }}
        refetchQueries={[
          { query: LOG_DETAILS_QUERY, variables: { id: this.props.id } }
        ]}
      >
        {(editLogMove, { loading, error }) => {
          return (
            <section className="content">
              <StyledFormAddMovement
                onSubmit={e => {
                  e.preventDefault();
                  editLogMove();
                  // Router.push({
                  //   pathname: "/log",
                  //   query: { id: this.props.id }
                  // });
                }}
              >
                {" "}
                <fieldset disabled={loading} aria-busy={loading}>
                  <h2>Edit Movement</h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr"
                    }}
                  >
                    <label>Weight Used </label>
                    <label>Reps</label>
                  </div>
                  <div>{weights}</div>
                  <StyledSecondaryButton
                    type="button"
                    onClick={this.handleNewMovement}
                  >
                    Add Set
                  </StyledSecondaryButton>
                  <StyledSecondaryButton type="submit">
                    Submit Movement
                  </StyledSecondaryButton>
                </fieldset>
              </StyledFormAddMovement>
              <Link href={{ pathname: "log", query: { id: this.props.logId } }}>
                <StyledSecondaryButton>Back to Log</StyledSecondaryButton>
              </Link>
            </section>
          );
        }}
      </Mutation>
    );
  }
}

export default EditLogMove;
