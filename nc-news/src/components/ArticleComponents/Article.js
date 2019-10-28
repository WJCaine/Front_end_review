import React, { Component } from "react";
import * as api from "../../api";

export default class Article extends Component {
  state = {
    article: {},
    Loaded: false
  };
  componentDidMount() {
    api.getArticle(this.props.article_id).then(article => {
      this.setState({ article, Loaded: true });
    });
  }
  render() {
    const { article } = this.state;
    return (
      <div>
        {this.state.Loaded ? <p>{article.body}</p> : <p>Loading ...</p>}
      </div>
    );
  }
}
