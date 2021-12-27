import axios from "axios";

export const SEND_SAVREQUEST = "SEND_SAVREQUEST";

export const sendSAVRequest = (name, email, phone, message) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/savrequest/send-savrequest`,
      data: {
        name: name,
        email: email,
        phoneNumber: phone,
        message: message
      }
    })
      .then((res) => {
        dispatch({ type: SEND_SAVREQUEST, payload: res.data});
      })
      .catch((err) => console.log(err));
  };
};