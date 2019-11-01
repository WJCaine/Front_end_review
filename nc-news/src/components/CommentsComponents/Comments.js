import React, { Component } from "react";
import * as api from "../../api";
import { Link } from "@reach/router";
import CommentUpvote from "./CommentUpvote";
import CommentDownvote from "./CommentDownvote";
import CommentAdder from "./CommentAdder";
import * as utils from "../../utils";

export default class Comments extends Component {
  state = {
    comments: [],
    Loaded: false,
    voteState: []
  };
  handleChange = event => {
    const { value } = event.target;
    this.setState({ newComment: value });
  };
  addComment = comment => {
    this.setState(currentState => {
      const newComments = [comment, ...currentState.comments];
      return { comments: newComments };
    });
  };
  componentDidMount() {
    api
      .getComments(this.props.article_id)
      .then(comments => {
        this.setState({ comments, Loaded: true });
      })
      .then(() => {
        this.setState({ voteState: Array(this.state.comments.length).fill(0) });
      });
  }
  vote = (comment_id, num, index) => {
    const { voteState } = this.state;
    if (voteState[index] === 1 && num === 1) {
      num = -1;
      this.setState(currentState => {
        const newVoteState = [...currentState.voteState];
        newVoteState[index] = 0;
        return { voteState: newVoteState };
      });
    } else if (voteState[index] === 1 && num === -1) {
      num = -2;
      this.setState(currentState => {
        const newVoteState = [...currentState.voteState];
        newVoteState[index] = -1;
        return { voteState: newVoteState };
      });
    } else if (voteState[index] === -1 && num === -1) {
      num = 1;
      this.setState(currentState => {
        const newVoteState = [...currentState.voteState];
        newVoteState[index] = 0;
        return { voteState: newVoteState };
      });
    } else if (voteState[index] === -1 && num === 1) {
      num = 2;
      this.setState(currentState => {
        const newVoteState = [...currentState.voteState];
        newVoteState[index] = 1;
        return { voteState: newVoteState };
      });
    } else if (voteState[index] === 0 && num === 1) {
      this.setState(currentState => {
        const newVoteState = [...currentState.voteState];
        newVoteState[index] = 1;
        return { voteState: newVoteState };
      });
    } else if (voteState[index] === 0 && num === -1) {
      this.setState(currentState => {
        const newVoteState = [...currentState.voteState];
        newVoteState[index] = -1;
        return { voteState: newVoteState };
      });
    }
    api.patchComment(comment_id, num).then(comment => {
      this.setState(currentState => {
        currentState.comments.splice(index, 1, comment);
        return {
          comments: currentState.comments
        };
      });
    });
  };
  deleteComment = (comment_id, index) => {
    api.deleteComment(comment_id).then(() => {
      this.setState(currentState => {
        currentState.comments.splice(index, 1);
        return { comments: currentState.comments };
      });
    });
  };
  render() {
    return (
      <div>
        <h2>
          <Link
            to={`/${this.props.topic}/${this.props.article_id}/${this.props.article_name}`}
          >
            {this.props.article_name}
          </Link>
        </h2>
        <>
          {this.props.user ? (
            <CommentAdder
              addComment={this.addComment}
              user={this.props.user}
              article_id={this.props.article_id}
            />
          ) : (
            <p>You must be logged in to post a comment.</p>
          )}
        </>
        {this.state.Loaded ? (
          <ul>
            {this.state.comments.map((comment, index) => {
              return (
                <li className="commentContainer" key={comment.comment_id}>
                  <div className="listVotes">
                    <CommentUpvote
                      commentId={comment.comment_id}
                      index={index}
                      vote={this.vote}
                      voteState={this.state.voteState}
                    />
                    <div>{comment.votes}</div>
                    <CommentDownvote
                      commentId={comment.comment_id}
                      index={index}
                      vote={this.vote}
                      voteState={this.state.voteState}
                    />
                  </div>
                  <div className="user">
                    <div>{comment.author}</div>
                    <div>
                      {utils.secondsToTimeString2(
                        (new Date() - new Date(comment.created_at)) / 1000
                      ) || "0 minutes"}{" "}
                      ago
                    </div>
                    <div>
                      {this.props.user === comment.author ? (
                        <button
                          className="deleteButton"
                          onClick={() =>
                            this.deleteComment(comment.comment_id, index)
                          }
                        >
                          Delete Comment
                        </button>
                      ) : null}
                    </div>
                  </div>
                  <p>{comment.body}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <div> Loading... </div>
        )}
      </div>
    );
  }
}
