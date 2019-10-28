import React, { Component } from "react";
import * as api from "../../api";

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
              <div className="listTitle">{article.title}</div>
              <div className="listComments">{article.comment_count}</div>
            </li>
          );
        })}
      </ul>
    );
  }
}
