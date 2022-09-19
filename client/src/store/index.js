import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import loginReducer from "./login";

const rootReducer = combineReducers({
  login: loginReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
