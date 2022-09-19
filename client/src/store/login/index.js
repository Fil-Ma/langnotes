import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

const loginReducer = combineReducers({
  auth: authReducer,
  user: userReducer
});

export default loginReducer;
