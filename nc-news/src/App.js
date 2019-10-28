import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import { Router } from "@reach/router";
import ArticleList from "./components/ArticleListComponents/ArticleList";
import TopicSearch from "./components/TopicSearch";
import Article from "./components/ArticleComponents/Article";
import Comments from "./components/CommentsComponents/Comments";
import Sort from "./components/Sort";

export default class App extends Component {
  state = {
    topic: "all",
    user: "guest",
    sort: "created_at"
  };
  changeTopic = topic => {
    this.setState({ topic });
  };
  changeSort = sort => {
    if (sort === "New") sort = "created_at";
    if (sort === "Top") sort = "votes";
    if (sort === "Most commented") sort = "comment_count";
    this.setState({ sort });
  };
  render() {
    return (
      <div>
        <Header />
        <TopicSearch changeTopic={this.changeTopic} />
        <Sort changeSort={this.changeSort} />
        <Router>
          <ArticleList path="/" />
          <ArticleList path="/articles" />
          <Article path="/:topic/:article_id/:article_name" />
          <Comments path="comments/:topic/:article_id/:article_name" />
        </Router>
      </div>
    );
  }
}
