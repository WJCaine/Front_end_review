import React, { Component } from "react";
import * as api from "../../api";
export default class CommentAdder extends Component {
  state = {
    newComment: ""
  };
  handleChange = event => {
    const { value } = event.target;
    this.setState({ newComment: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    api
      .postComment(
        this.props.article_id,
        this.props.user,
        this.state.newComment
      )
      .then(comment => {
        this.props.addComment(comment);
        this.setState({ newComment: "" });
      });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Add a comment :
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.newComment}
          ></input>
        </label>
        <button type="submit">Post Comment</button>
      </form>
    );
  }
}
