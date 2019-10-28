import React, { Component } from "react";
import * as api from "../../api";
import { Link } from "@reach/router";

export default class ArticleList extends Component {
  state = {
    articles: []
  };
  componentDidMount() {
    api.getArticles().then(articles => {
      this.setState({ articles });
    });
  }

  render() {
    return (
      <ul>
        {this.state.articles.map(article => {
          return (
            <li className="listContainer" key={article.article_id}>
              <div className="listVotes">{article.votes}</div>
              <Link
                to={`/${article.topic}/${article.article_id}/${article.title}`}
                className="listTitle"
              >
                {article.title}
              </Link>
              <Link
                to={`/comments/${article.topic}/${article.article_id}/${article.title}`}
                className="listComments"
              >
                {article.comment_count}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
}
