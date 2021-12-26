import axios from "axios";

export const GET_ALL_ARTICLES = "GET_ALL_ARTICLES";

export const getAllArticles = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/article/get-all-articles`)
      .then((res) => {
        dispatch({ type: GET_ALL_ARTICLES, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};