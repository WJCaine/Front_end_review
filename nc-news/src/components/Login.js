import React, { Component } from "react";

export default class Login extends Component {
  state = {
    user: ""
  };
  handleChange = event => {
    const { value } = event.target;
    this.setState({ user: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.changeUser(this.state.user);
    this.setState({ user: "" });
  };
  render() {
    return (
      <div id="signIn">
        {this.props.user ? <h3>Signed in as {this.props.user}</h3> : null}
        <form onSubmit={this.handleSubmit}>
          <label>
            {" "}
            Sign in :
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.user}
            ></input>
          </label>
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}
