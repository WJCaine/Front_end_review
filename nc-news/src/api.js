import axios from "axios";
const instance = axios.create({
  baseURL: "https://billy-nc-news.herokuapp.com/api"
});

export const getArticles = (sort_by, topic, page) => {
  if (topic === "all") topic = "";
  return instance
    .get("/articles", {
      params: {
        sort_by,
        topic,
        limit: 10,
        p: page
      }
    })
    .then(({ data }) => {
      return data;
    });
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
export const patchArticle = (article_id, num) => {
  return instance
    .patch(`/articles/${article_id}`, {
      inc_votes: num
    })
    .then(({ data }) => data.article);
};

export const getTopics = () => {
  return instance.get(`/topics`).then(({ data }) => data.topics);
};
export const patchComment = (comment_id, num) => {
  return instance
    .patch(`/comments/${comment_id}`, {
      inc_votes: num
    })
    .then(({ data }) => data.comment);
};
export const deleteComment = comment_id => {
  return instance.delete(`/comments/${comment_id}`);
};

export const postComment = (article_id, username, body) => {
  return instance
    .post(`/articles/${article_id}/comments`, {
      username,
      body
    })
    .then(({ data }) => data.comment);
};

export const getUser = username => {
  return instance.get(`/users/${username}`).then(({ data }) => data.user);
};
