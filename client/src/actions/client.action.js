import axios from "axios";

export const GET_CLIENT = "GET_CLIENT";

export const getClient = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/client/get-client/${uid}`)
      .then((res) => {
        dispatch({ type: GET_CLIENT, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
