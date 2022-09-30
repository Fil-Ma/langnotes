import "./Notebook.css";
import LessonsList from "../../components/lessons/LessonsList";
import Vocabulary from "../../components/vocabulary/Vocabulary";

function Notebook({ notebook }) {

  return (
    <main className="notebook">
      <h1 className="notebook-name">{ notebook.name }</h1>
      <div className="notebook-container">
        <LessonsList notebookId={ notebook.id } />
        <Vocabulary notebookId={ notebook.id } />
      </div>
    </main>
  )
}

export default Notebook;
