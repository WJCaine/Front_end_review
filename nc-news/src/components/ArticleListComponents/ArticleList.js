import React, { Component } from "react";
import * as api from "../../api";
import { Link } from "@reach/router";
import ArticleUpvote from "./ArticleUpvote";
import ArticleDownvote from "./ArticleDownvote";
import DisplayError from "../../DisplayError";
import Pagination from "./Pagination";
import * as utils from "../../utils";

export default class ArticleList extends Component {
  state = {
    articles: [],
    Loaded: false,
    err: null,
    voteState: [],
    page: 1,
    maxPage: 1
  };
  vote = (article_id, num, index) => {
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
    api.patchArticle(article_id, num).then(article => {
      this.setState(currentState => {
        currentState.articles.splice(index, 1, article);
        return {
          articles: currentState.articles
        };
      });
    });
  };
  changePage = num => {
    this.setState(currentState => {
      return { page: currentState.page + num };
    });
  };
  fetchArticles() {
    return api
      .getArticles(this.props.sort, this.props.topic, this.state.page)
      .then(({ articles, articleCount }) => {
        this.setState({
          articles,
          Loaded: true,
          error: null,
          maxPage: Math.ceil(articleCount / 10)
        });
      })
      .catch(error => {
        const err = { msg: error.response.data, status: error.response.status };
        this.setState({ err });
      });
  }
  componentDidMount() {
    this.fetchArticles().then(() => {
      this.setState({ voteState: Array(this.state.articles.length).fill(0) });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.sort !== prevProps.sort ||
      this.props.topic !== prevProps.topic ||
      this.state.page !== prevState.page
    ) {
      this.fetchArticles();
    }
  }

  render() {
    const { err } = this.state;
    if (err) return <DisplayError err={err} />;
    return (
      <>
        {this.state.Loaded ? (
          <>
            <h2 className="title">
              {this.props.topic ? this.props.topic : "All"}
            </h2>
            <ul id="articleList">
              {this.state.articles.map((article, index) => {
                return (
                  <li className="listContainer" key={article.article_id}>
                    <div className="listVotes">
                      <ArticleUpvote
                        articleId={article.article_id}
                        index={index}
                        vote={this.vote}
                        voteState={this.state.voteState}
                      />
                      <div>{article.votes}</div>
                      <ArticleDownvote
                        articleId={article.article_id}
                        index={index}
                        vote={this.vote}
                        voteState={this.state.voteState}
                      />
                    </div>
                    <Link
                      to={`/${article.topic}/${article.article_id}/${article.title}`}
                      className="listTitle"
                    >
                      {article.title}
                    </Link>
                    <div>
                      <div className="user">Posted by : {article.author}</div>
                      <div>
                        {" "}
                        {utils.secondsToTimeString2(
                          (new Date() - new Date(article.created_at)) / 1000
                        )}{" "}
                        ago
                      </div>
                    </div>

                    <Link
                      to={`/comments/${article.topic}/${article.article_id}/${article.title}`}
                      className="listComments"
                    >
                      Comments : {article.comment_count}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Pagination
              changePage={this.changePage}
              maxPage={this.state.maxPage}
              page={this.state.page}
            />
          </>
        ) : (
          <p>Loading</p>
        )}
      </>
    );
  }
}
