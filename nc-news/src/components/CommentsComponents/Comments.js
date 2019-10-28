import React, { Component } from "react";
import * as api from "../../api";

export default class Comments extends Component {
  state = {
    comments: [],
    Loaded: false
  };
  componentDidMount() {
    api.getComments(this.props.article_id).then(comments => {
      this.setState({ comments, Loaded: true });
    });
  }
  render() {
    return (
      <div>
        {this.state.Loaded ? (
          <ul>
            {this.state.comments.map(comment => {
              return <li key={comment.comment_id}>{comment.body}</li>;
            })}
          </ul>
        ) : (
          <div> Loading... </div>
        )}
      </div>
    );
  }
}
