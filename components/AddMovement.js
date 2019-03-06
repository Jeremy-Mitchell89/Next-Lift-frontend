import React from "react";
import gql from "graphql-tag";
import routines from "../static/percentages";
import { Mutation, Query } from "react-apollo";
import { LOG_DETAILS_QUERY } from "./LogDetails";
import { CURRENT_USER_QUERY } from "./User";
import SearchMovement from "./SearchMovement";
import { StyledFormAddMovement } from "./styles/StyledForm";
import {
  StyledSelect,
  SubmitButton,
  StyledButton,
  StyledSecondaryButton,
  StyledInput
} from "./styles/Inputs";
import Error from "./ErrorMessage";

const ADD_TO_LOG_MUTATION = gql`
  mutation ADD_TO_LOG_MUTATION($name: String!, $weight: [Int!], $reps: [Int!]) {
    createLogMove(name: $name, weight: $weight, reps: $reps) {
      name
      weight
      reps
    }
  }
`;

class AddMovement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      weight: [""],
      reps: [""],
      show: false,
      routine: "Standard_531",
      week: "week1"
    };
    this.handleNewMovement = this.handleNewMovement.bind(this);
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
  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  passVal = childData => {
    this.setState({ name: childData });
  };
  handleRoutine = e => {
    e.preventDefault();
    this.setState({ routine: e.target.value });
  };
  handleWeek = e => {
    e.preventDefault();
    this.setState({ week: e.target.value });
  };
  addRoutine = (data, move) => {
    const movementCorrelation = {
      "Bench Press": "benchPress",
      Squat: "squat",
      DeadLift: "deadLift",
      "Overhead Press": "press"
    };
    const selected = movementCorrelation[move];
    let weights = [];
    let reps = [];
    for (
      var i = 0;
      i < routines[this.state.routine][this.state.week].reps.length;
      i++
    ) {
      weights.push(
        Math.round(
          Math.round(
            (routines[this.state.routine][this.state.week].weight[i] *
              data.me[selected]) /
              5
          ) * 5
        )
      );
      reps.push(routines[this.state.routine][this.state.week].reps[i]);
    }
    if (selected) {
      this.setState({ weight: weights, reps: reps });
    } else
      alert(
        "Enter Bench Press, DeadLift, Squat, or Overhead Press as movement to add routine sets"
      );
  };
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
    const routineOptions = Object.keys(routines).map((routine, i) => {
      return <option key={i}>{routine}</option>;
    });
    const weekOptions = Object.keys(routines[this.state.routine]).map(
      (week, i) => {
        return <option key={i}>{week}</option>;
      }
    );
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data }) => (
          <Mutation
            mutation={ADD_TO_LOG_MUTATION}
            variables={{
              id: this.props.id,
              name: this.state.name,
              reps: this.state.reps,
              weight: this.state.weight
            }}
            refetchQueries={[
              { query: LOG_DETAILS_QUERY, variables: { id: this.props.id } }
            ]}
          >
            {(createLogMove, { loading, error }) => {
              {
                if (this.state.show)
                  return (
                    <section className="content">
                      <StyledFormAddMovement
                        onSubmit={e => {
                          e.preventDefault();
                          createLogMove();
                          this.setState({ name: "", weight: [], reps: [] });
                        }}
                      >
                        <Error error={error} />

                        <fieldset disabled={loading} aria-busy={loading}>
                          <h2>Add New Movement</h2>
                          <label>Name of Movement</label>
                          <SearchMovement
                            name="name"
                            type="string"
                            passValUp={this.passVal}
                          />
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
                      <form>
                        <p>
                          Select routine and week from the dropdown lists to
                          pre-fill working sets on main movement based off maxes
                          in your profile.
                        </p>
                        <StyledSelect onChange={this.handleRoutine}>
                          {routineOptions}
                        </StyledSelect>
                        <StyledSelect onChange={this.handleWeek}>
                          {weekOptions}
                        </StyledSelect>
                        <StyledSecondaryButton
                          onClick={e => {
                            e.preventDefault();
                            this.addRoutine(data, this.state.name);
                          }}
                        >
                          Add Routine Sets
                        </StyledSecondaryButton>
                      </form>
                      <StyledButton
                        onClick={e => {
                          e.preventDefault();
                          this.setState({ show: !this.state.show });
                        }}
                      >
                        Hide
                      </StyledButton>
                    </section>
                  );
                else
                  return (
                    <div>
                      <StyledButton
                        onClick={e => {
                          e.preventDefault();
                          this.setState({ show: !this.state.show });
                        }}
                      >
                        Add New Movement
                      </StyledButton>
                    </div>
                  );
              }
            }}
          </Mutation>
        )}
      </Query>
    );
  }
}
export { ADD_TO_LOG_MUTATION };
export default AddMovement;
