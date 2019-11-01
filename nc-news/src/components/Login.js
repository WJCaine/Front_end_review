import React, { Component } from "react";
import * as api from "../api";

export default class Login extends Component {
  state = {
    user: "",
    badUser: false
  };
  handleChange = event => {
    const { value } = event.target;
    this.setState({ user: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    api
      .getUser(this.state.user)
      .then(() => {
        this.props.changeUser(this.state.user);
        this.setState({ user: "", badUser: false });
      })
      .catch(err => {
        this.setState(currentState => {
          const badUser = currentState.user;
          return { user: "", badUser };
        });
      });
  };
  render() {
    return (
      <div id="signIn">
        {this.props.user ? (
          <>
            <h3>Signed in as {this.props.user}</h3>
            <button onClick={() => this.props.changeUser("")}>Sign out</button>
          </>
        ) : null}
        {this.state.badUser ? (
          <h3 className="warning">User {this.state.badUser} does not exist</h3>
        ) : null}
        {this.props.user ? null : (
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
        )}
      </div>
    );
  }
}
