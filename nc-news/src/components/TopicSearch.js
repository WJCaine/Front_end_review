import React, { Component } from "react";

export default class TopicSearch extends Component {
  state = {
    searchedTopic: ""
  };
  handleChange = event => {
    const { value } = event.target;
    this.setState({ searchedTopic: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.changeTopic(this.state.searchedTopic);
    this.setState({ searchedTopic: "" });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {" "}
          Search for a topic :
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.searchedTopic}
          ></input>
        </label>
        <button type="submit">Search</button>
      </form>
    );
  }
}
