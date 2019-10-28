import axios from "axios";
const instance = axios.create({
  baseURL: "https://billy-nc-news.herokuapp.com/api"
});

export const getArticles = (sort_by, topic) => {
  return instance
    .get("/articles", {
      params: {
        sort_by,
        topic,
        limit: 50
      }
    })
    .then(({ data }) => data.articles);
};

export const getArticle = article_id => {
  return instance
    .get(`articles/${article_id}`, {
      params: {}
    })
    .then(({ data }) => data.article);
};

export const getComments = article_id => {
  return instance
    .get(`articles/${article_id}/comments`)
    .then(({ data }) => data.comments);
};
