import React from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { LOG_DETAILS_QUERY } from "./LogDetails";
import { CURRENT_USER_QUERY } from "./User";
import SearchMovement from "./SearchMovement";
import { StyledFormAddMovement, SubmitButton } from "./styles/StyledForm";

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
      show: false
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
  render() {
    const weights = this.state.weight.map((weight, i) => (
      <div key={i} style={{ display: "flex" }}>
        <div>
          <li>
            {i + 1}.
            <input
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
            <input
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
                          <SubmitButton
                            type="button"
                            onClick={this.handleNewMovement}
                          >
                            Add Set
                          </SubmitButton>
                          <SubmitButton type="submit">
                            Submit Movement
                          </SubmitButton>
                        </fieldset>
                      </StyledFormAddMovement>
                      <SubmitButton
                        onClick={e => {
                          e.preventDefault();
                          this.setState({ show: !this.state.show });
                        }}
                      >
                        Hide
                      </SubmitButton>
                    </section>
                  );
                else
                  return (
                    <div>
                      <SubmitButton
                        onClick={e => {
                          e.preventDefault();
                          this.setState({ show: !this.state.show });
                        }}
                      >
                        Add New Movement
                      </SubmitButton>
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

export default AddMovement;
