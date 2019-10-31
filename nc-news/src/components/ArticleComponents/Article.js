import React, { Component } from "react";
import * as api from "../../api";
import { Link } from "@reach/router";
import DisplayError from "../../DisplayError";

export default class Article extends Component {
  state = {
    article: {},
    Loaded: false,
    err: null
  };
  componentDidMount() {
    api
      .getArticle(this.props.article_id)
      .then(article => {
        this.setState({ article, Loaded: true, err: null });
      })
      .catch(error => {
        const err = { msg: error.response.data, status: error.response.status };
        this.setState({ err });
      });
  }
  render() {
    const { article, err } = this.state;
    if (err) return <DisplayError err={err} />;
    return (
      <>
        {this.state.Loaded ? (
          <>
            {" "}
            <h2>{article.title}</h2>
            <h3>
              Posted by : {article.author} to{" "}
              <Link to={`/${article.topic}`}>{article.topic}</Link>
            </h3>{" "}
            <p>{article.body}</p>
          </>
        ) : (
          <p>Loading ...</p>
        )}
      </>
    );
  }
}
