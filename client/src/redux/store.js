import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import logger from "redux-logger";
import reduxThunk from "redux-thunk";
import rootReducer from "./rootreducer";

const middleWare = [reduxThunk];
if (process.env.NODE_ENV === "development") {
  middleWare.push(logger);
}

const store = configureStore(
  {
    reducer: rootReducer,
  },
  applyMiddleware(...middleWare)
);

export default store;
