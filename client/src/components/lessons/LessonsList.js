import "./lessons.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import Button from "../button/Button";
import NewLessonForm from "./NewLessonForm";
import LessonPreview from "./LessonPreview";
import { loadAllLessons, addLesson } from "../../store/notebook/lesson/lesson.actions";

function LessonsList({ notebookId }) {

  const [isLessonFormVisible, setIsLessonFormVisible] = useState(false);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonContent, setLessonContent] = useState("");

  const dispatch = useDispatch();
  const lessons = useSelector((state) => state.notebook.lesson);

  dispatch(loadAllLessons(notebookId));

  const newLessonForm = document.getElementById("new-lesson-form");

  // This function handles opening of the form to add a new lesson
  const hendleShowNewLessonForm = (e) => {
    e.preventDefault();

    if (!isLessonFormVisible) {
      newLessonForm.style.display = "";
      setIsLessonFormVisible(true);
    }
    console.log("Opened form to submit new lesson data");
  };

  // This function handles closing of the form to add a new lesson
  const handleCloseNewLessonForm = (e) => {
    e.preventDefault();
    newLessonForm.style.display = "none";
    setIsLessonFormVisible(false);
    console.log("Closed form to submit new lesson data");
  }

  // This function handles the insertion of a new lesson
  const handleSubmitNewLesson = async (e) => {
    try {
      e.preventDefault();
      await dispatch(addLesson({
        title: lessonTitle,
        description: lessonDescription,
        content: lessonContent,
        notebookId
      }))
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <section className="lessons-container">
      <h2>Lessons</h2>
      <Button
        onClick={hendleShowNewLessonForm}
        className="add-new add-lesson">(+) Add New</Button>

      <div id="new-lesson-form">
        <NewLessonForm
          onSubmit={handleSubmitNewLesson}
          handleCloseWindow={handleCloseNewLessonForm}
          setLessonTitle={setLessonTitle}
          setLessonDescription={setLessonDescription}
          setLessonContent={setLessonContent} />
      </div>

      {
        Object.keys(lessons).length > 0
          ? <p>Add lessons to view them in this section</p>
          : Object.keys(lessons).forEach(lessonId => {
              return (
                <LessonPreview
                  lessonId={ lessonId }
                  title={ lessons[lessonId].title }
                  description={ lessons[lessonId].description } />
              )
            })
      }

    </section>
  );
}

export default LessonsList;
