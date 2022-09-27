import "./NoteBook.css";
import LessonsList from "../../components/lessons/LessonsList";
import Vocabulary from "../../components/vocabulary/Vocabulary";

function NoteBook() {

  return (
    <main className="notebook">
      <h1 className="notebook-name">Notebook Name</h1>
      <div className="notebook-container">
        <LessonsList />
        <Vocabulary />
      </div>
    </main>
  )
}

export default NoteBook;
