import { GET_CLIENT } from "../actions/client.action";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENT:
      return action.payload;

    default:
      return state;
  }
};