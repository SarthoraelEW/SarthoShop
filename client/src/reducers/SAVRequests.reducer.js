import { SEND_SAVREQUEST } from '../actions/SAVRequests.action.js';

const initialState = [];

export default function SAVRequestsReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_SAVREQUEST:
      return state.concat([action.payload]);

    default:
      return state;
  }
};