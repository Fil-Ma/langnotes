import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import loginReducer from "./login";
import notebookReducer from "./notebook";

const rootReducer = combineReducers({
  login: loginReducer,
  notebook: notebookReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;