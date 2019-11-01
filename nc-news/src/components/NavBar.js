import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";

export default class NavBar extends Component {
  state = {
    topics: []
  };
  componentDidMount() {
    api.getTopics().then(topics => {
      this.setState({ topics });
    });
  }
  render() {
    return (
      <ul className="NavBar">
        {this.state.topics.map(topic => {
          return (
            <Link className="NavItem" key={topic.slug} to={`/${topic.slug}`}>
              {"   "}
              {topic.slug}
              {"  "}
            </Link>
          );
        })}
      </ul>
    );
  }
}
