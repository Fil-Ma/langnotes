import { combineReducers } from "redux";
import lessonReducer from "./lessonReducer";
import vocabularyReducer from "./vocabularyReducer";

const notebookReducer = combineReducers({
  lesson: lessonReducer,
  vocabulary: vocabularyReducer
});

export default notebookReducer;
