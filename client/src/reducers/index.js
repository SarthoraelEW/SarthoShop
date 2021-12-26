import { combineReducers } from "redux";
import clientReducer from "./client.reducer";
import articlesReducer from "./articles.reducer";

export default combineReducers({
  clientReducer, articlesReducer
});