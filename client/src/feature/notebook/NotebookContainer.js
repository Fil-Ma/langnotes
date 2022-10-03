import "./Notebook.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Notebook from "./Notebook";
import LessonsList from "../../components/lessons/LessonsList/LessonsList";
import Vocabulary from "../../components/vocabulary/Vocabulary/Vocabulary";

function NotebookContainer() {

  const { notebookId } = useParams();

  const [ activeNotebook ] = useSelector((state) => state.login.user.notebooks.filter((notebook) => notebook.id === notebookId));

  return (
    <Notebook notebook={activeNotebook} >
      <LessonsList notebookId={ activeNotebook.id } />
      <Vocabulary notebookId={ activeNotebook.id } />
    </Notebook>
  )
}

export default NotebookContainer;
