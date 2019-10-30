import React, { Component } from "react";
import * as api from "../../api";
import { Link } from "@reach/router";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";

export default class ArticleList extends Component {
  state = {
    articles: [],
    Loaded: false,
    error: null
  };
  vote = (article_id, num, index) => {
    api.patchArticle(article_id, num).then(article => {
      this.setState(currentState => {
        currentState.articles.splice(index, 1, article);
        return {
          articles: currentState.articles
        };
      });
    });
  };

  componentDidMount() {
    api.getArticles(this.props.sort, this.props.topic).then(articles => {
      this.setState({ articles, Loaded: true });
    });
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.sort !== prevProps.sort ||
      this.props.topic !== prevProps.topic
    ) {
      api.getArticles(this.props.sort, this.props.topic).then(articles => {
        this.setState({ articles });
      });
    }
  }

  render() {
    return (
      <>
        {this.state.Loaded ? (
          <ul id="articleList">
            {this.state.articles.map((article, index) => {
              return (
                <li className="listContainer" key={article.article_id}>
                  <div className="listVotes">
                    <div>
                      <IoIosArrowDropupCircle
                        onClick={() => this.vote(article.article_id, 1, index)}
                      />
                    </div>
                    <div>{article.votes}</div>
                    <div>
                      <IoIosArrowDropdownCircle
                        onClick={() => this.vote(article.article_id, -1, index)}
                      />
                    </div>
                  </div>
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
                    Comments : {article.comment_count}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Loading</p>
        )}
      </>
    );
  }
}
