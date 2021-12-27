import { combineReducers } from "redux";
import articlesReducer from "./articles.reducer";
import SAVRequestsReducer from "./SAVRequests.reducer";

export default combineReducers({
  articlesReducer, SAVRequestsReducer
});