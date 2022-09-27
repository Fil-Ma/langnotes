import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import userReducer from "./user/userReducer";

const loginReducer = combineReducers({
  auth: authReducer,
  user: userReducer
});

export default loginReducer;
