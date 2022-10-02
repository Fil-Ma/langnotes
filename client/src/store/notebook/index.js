import { combineReducers } from "redux";
import lessonReducer from "./lesson/lessonReducer";
import vocabularyReducer from "./vocabulary/vocabularyReducer";

const notebookReducer = combineReducers({
  lesson: lessonReducer,
  vocabulary: vocabularyReducer
});

export default notebookReducer;
