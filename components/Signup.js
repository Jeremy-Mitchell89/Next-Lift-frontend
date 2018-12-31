import React from "react";

class Signup extends React.Component {
  state = {
    email: "",
    name: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <form>
        <h2>Signup for an account</h2>
        <label htmlfor="email">Email</label>
        <input
          type="email"
          name="email"
          placehold="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <label htmlfor="name">Name</label>
        <input
          type="text"
          name="name"
          placehold="Name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label htmlfor="password">Password</label>
        <input
          type="password"
          name="password"
          placehold="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default Signup;
