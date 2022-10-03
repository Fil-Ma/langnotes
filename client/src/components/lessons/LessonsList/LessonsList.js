import "./lessonsList.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import Button from "../../button/Button";
import Modal from "../../modal/Modal";
import NewLessonForm from "../NewLessonForm/NewLessonForm";
import LessonPreview from "../LessonPreview/LessonPreview";
import { loadAllLessons, addLesson } from "../../../store/notebook/lesson/lesson.actions";

export default function LessonsList({ notebookId }) {

  const [isLessonFormVisible, setIsLessonFormVisible] = useState(false);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonContent, setLessonContent] = useState("");

  const dispatch = useDispatch();

  const lessonForm = document.getElementById("new-lesson-form");
  const lessons = useSelector((state) => state.notebook.lesson.lessons);

  // update state on mounting and when notebookId is changed
  useEffect(() => {
    dispatch(loadAllLessons(notebookId));
  }, [notebookId]);

  // This function handles opening of the form to add a new lesson
  const handleShowNewLessonForm = (e) => {
    e.preventDefault();
    setIsLessonFormVisible(true);
    console.log("Opened form to submit new lesson data");
  };

  // This function handles closing of the form to add a new lesson
  const handleCloseNewLessonForm = (e) => {
    e.preventDefault();
    setIsLessonFormVisible(false);
    console.log("Closed form to submit new lesson data");
  };

  // This function handles closing of the form id user clicks outside the window
  const handleClickOutside = (e) => {
    if (e.target === lessonForm) {
      handleCloseNewLessonForm(e);
    }
  };

  // This function handles the insertion of a new lesson
  const handleSubmitNewLesson = async (e) => {
    try {
      e.preventDefault();
      await dispatch(addLesson({
        title: lessonTitle,
        description: lessonDescription,
        content: lessonContent,
        notebookId
      }));
      handleCloseNewLessonForm(e);
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <section className="lessons-container">
      <h2>Lessons</h2>
      <Button
        onClick={handleShowNewLessonForm}
        className="add-new add-lesson white-text orange-background orange-border link">
          (+) Add New
      </Button>

      <Modal
        id="new-lesson-form"
        handleClose={handleCloseNewLessonForm}
        handleClickOutside={handleClickOutside}
        isFormVisible={isLessonFormVisible}>
          <NewLessonForm
            onSubmit={handleSubmitNewLesson}
            setLessonTitle={setLessonTitle}
            setLessonDescription={setLessonDescription}
            setLessonContent={setLessonContent} />
      </Modal>

      {
        Object.keys(lessons).length < 1
          ? <p className="no-lessons-text">Add lessons to view them in this section</p>
          : Object.keys(lessons).map(lessonId => {
              return (
                <LessonPreview
                  key={lessonId}
                  title={lessons[lessonId].title}
                  description={lessons[lessonId].description} />
              )
            })
      }

    </section>
  );
}
