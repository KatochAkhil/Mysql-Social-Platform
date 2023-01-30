import { combineReducers } from "redux";
import { mainReducer } from "./reducer";

const rootReducer = combineReducers({
  data: mainReducer,
});

export default rootReducer;
