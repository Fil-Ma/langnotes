import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import loginReducer from "./login";
import notebookReducer from "./notebook";

// this is the top level reducer
const appReducer = combineReducers({
  login: loginReducer,
  notebook: notebookReducer
});

// rootReducer manages to clear the state after user logout
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
};

const store = configureStore({
  reducer: rootReducer
});

export default store;
