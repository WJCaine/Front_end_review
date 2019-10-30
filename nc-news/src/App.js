import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import { Router } from "@reach/router";
import ArticleList from "./components/ArticleListComponents/ArticleList";
import Article from "./components/ArticleComponents/Article";
import Comments from "./components/CommentsComponents/Comments";
import Sort from "./components/Sort";
import NavBar from "./components/NavBar";
import Login from "./components/Login";

export default class App extends Component {
  state = {
    user: "",
    sort: "created_at"
  };
  changeSort = sort => {
    if (sort === "New") sort = "created_at";
    if (sort === "Top") sort = "votes";
    if (sort === "Most commented") sort = "comment_count";
    this.setState({ sort });
  };
  changeUser = user => {
    this.setState({ user });
  };
  render() {
    return (
      <div id="wholeApp">
        <Header />
        <NavBar />
        <Login changeUser={this.changeUser} user={this.state.user} />
        <Sort changeSort={this.changeSort} />
        <Router>
          <ArticleList sort={this.state.sort} path="/" />
          <ArticleList sort={this.state.sort} path="/articles" />
          <ArticleList sort={this.state.sort} path="/:topic" />
          <Article path="/:topic/:article_id/:article_name" />
          <Comments
            path="comments/:topic/:article_id/:article_name"
            user={this.state.user}
          />
        </Router>
      </div>
    );
  }
}
