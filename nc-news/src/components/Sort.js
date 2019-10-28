import React, { Component } from "react";

export default class Sort extends Component {
  state = {
    sortBy: "New"
  };
  handleChange = event => {
    const { value } = event.target;
    this.setState({ sortBy: value });
    this.props.changeSort(value);
  };
  render() {
    return (
      <form>
        <label>
          Sort :
          <select onChange={this.handleChange}>
            <option>New</option>
            <option>Top</option>
            <option>Most commented</option>
          </select>
        </label>
      </form>
    );
  }
}
