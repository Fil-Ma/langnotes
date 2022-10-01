import "./Notebook.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import LessonsList from "../../components/lessons/LessonsList";
import Vocabulary from "../../components/vocabulary/Vocabulary";

function Notebook() {

  const { notebookId } = useParams();

  const [ activeNotebook ] = useSelector((state) => state.login.user.notebooks.filter((notebook) => notebook.id === notebookId));

  return (
    <main className="notebook">
      <h1 className="notebook-name">{ activeNotebook.name }</h1>
      <div className="notebook-container">
        <LessonsList notebookId={ activeNotebook.id } />
        <Vocabulary notebookId={ activeNotebook.id } />
      </div>
    </main>
  )
}

export default Notebook;
