import axios from "axios";
const instance = axios.create({
  baseURL: "https://billy-nc-news.herokuapp.com/api"
});

export const getArticles = (sort_by, topic) => {
  return instance
    .get("/articles", {
      params: {
        sort_by,
        topic
      }
    })
    .then(({ data }) => data.articles);
};
