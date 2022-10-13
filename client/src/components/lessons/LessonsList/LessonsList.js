import "./lessonsList.css";

// import react hooks
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

// import components
import Button from "../../button/Button";
import Modal from "../../modal/Modal";
import NewLessonForm from "../NewLessonForm/NewLessonForm";
import LessonEditWindow from "../LessonEditWindow/LessonEditWindow";
import LessonPreview from "../LessonPreview/LessonPreview";

// import actions to dispatch
import { loadAllLessons, addLesson, deleteLesson, updateLesson } from "../../../store/notebook/lesson/lesson.actions";

// FUNCTION COMPONENT DECLARATION
export default function LessonsList({
  notebookId
}) {

  // visibility status of new lesson form modal
  const [isLessonFormVisible, setIsLessonFormVisible] = useState(false);
  // visibility status of lesson edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // set status variables to use both in new lesson form and lesson edit window
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [currentLessonId, setCurrentLessonId] = useState("");

  // declare dispatch function to dispatch actions to the store
  const dispatch = useDispatch();

  // get modal of new lesson form, to perform actions on modal visibility
  const lessonForm = document.getElementById("new-lesson-form");
  // get modal of lesson edit window, to perform actions on modal visibility
  const lessonEdit = document.getElementById("lesson-edit-modal");

  // get lessons object from store with selector
  const lessons = useSelector((state) => state.notebook.lesson.lessons);

  // update state on mounting and when component is mounted
  useEffect(() => {
    dispatch(loadAllLessons(notebookId));
  }, [notebookId]);

 //  // add event listener to new lesson form modal on key down === escape key
 //  useEffect(() => {
 //     const closeNewLessonForm = (e) => {
 //       if (e.keyCode === 27 && isLessonFormVisible){
 //         handleCloseNewLessonForm(e);
 //       }
 //     }
 //     lessonForm.addEventListener('keydown', closeNewLessonForm);
 //
 //     // event listener cleanup
 //     return () => lessonForm.removeEventListener('keydown', closeNewLessonForm);
 //  }, [isLessonFormVisible, lessonForm]);
 //
 //  // add event listener to edit lesson modal on key down === escape key
 //  useEffect(() => {
 //    const closeEditWindow = (e) => {
 //      if (e.keyCode === 27 && isModalOpen){
 //        handleCloseEditWindow(e);
 //      }
 //    }
 //    lessonEdit.addEventListener('keydown', closeEditWindow);
 //
 //    // event listener cleanup
 //    return () => lessonEdit.removeEventListener('keydown', closeEditWindow);
 //  }, [isModalOpen, lessonEdit]);



  /*
    NEW LESSON FORM functions
  */


  // ###### modal management functions ######

  // This function sets visibility on new lesson form modal
  const handleOpenNewLessonForm = (e) => {
    e.preventDefault();
    setIsLessonFormVisible(true);
  };

  // This function hides new lesson form modal
  const handleCloseNewLessonForm = (e) => {
    e.preventDefault();
    setIsLessonFormVisible(false);

    //reset states when closing the modal
    setLessonTitle("");
    setLessonDescription("");
    setLessonContent("");
  };

  // This function hides new lesson form modal if the user clicks outside of it
  const handleClickOutsideLessonForm = (e) => {
    // check if target is the modal container (not the window content)
    if (e.target === lessonForm) {
      handleCloseNewLessonForm(e);
    }
  };

  // This function dispatch an action to the store with the data for the lesson insertion
  const handleSubmitNewLessonForm = async (e) => {
    try {
      e.preventDefault();
      await dispatch(addLesson({
        title: lessonTitle,
        description: lessonDescription,
        content: lessonContent,
        notebookId
      }));

      // close window after submission
      handleCloseNewLessonForm(e);
    } catch(err) {
      console.log(err);
    }
  };



  /*
    EDIT LESSON functions
  */


  // ###### modal management functions ######

  // This function sets visibility on edit lesson modal
  const handleOpenEditWindow = (lessonId, e) => {
    e.preventDefault();

    // set data that will be used in edit lesson modal
    setCurrentLessonId(lessonId);
    setLessonTitle(lessons[lessonId].title);
    setLessonDescription(lessons[lessonId].description);
    setLessonContent(lessons[lessonId].content);

    // open modal
    setIsModalOpen(true);
  };

  // This function hides edit lesson modal
  const handleCloseEditWindow = (e) => {
    e.preventDefault();
    setIsModalOpen(false);

    // reset states
    setLessonTitle("");
    setLessonDescription("");
    setLessonContent("");
    setCurrentLessonId("");
  };

  // This function hides edit lesson modal if the user clicks outside of it
  const handleClickOutsideEditWindow = (e) => {
    // check if target is the modal container (not the window content)
    if (e.target === lessonEdit) {
      handleCloseEditWindow(e);
    }
  };

  // This function dispatches an update action in case the user wants to upddate lesson data
  const handleUpdateInfos = async (lessonId, e) => {
    try {
      e.preventDefault();
      await dispatch(updateLesson({
        lessonId,
        title: lessonTitle,
        content: lessonContent,
        description: lessonDescription,
        notebookId
      }));
      handleCloseEditWindow(e);
    } catch(err) {
      console.log(err);
    }
  };

  // This function dispatches a delete action in case the user wants to delete the lesson
  const handleDeleteLesson = async (lessonId, e) => {
    try {
      e.preventDefault();
      await dispatch(deleteLesson(lessonId));
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <section className="lessons-container">
      <h2>Lessons</h2>
      
      <Button
        onClick={handleOpenNewLessonForm}
        className="add-new add-lesson white-text orange-background orange-border link">
          (+) Add New
      </Button>

      <Modal
        id="new-lesson-form"
        handleClose={handleCloseNewLessonForm}
        handleClickOutside={handleClickOutsideLessonForm}
        isFormVisible={isLessonFormVisible}>
          <NewLessonForm
            onSubmit={handleSubmitNewLessonForm}
            title={lessonTitle}
            description={lessonDescription}
            content={lessonContent}
            setLessonTitle={setLessonTitle}
            setLessonDescription={setLessonDescription}
            setLessonContent={setLessonContent} />
      </Modal>

      <Modal
        id="lesson-edit-modal"
        handleClose={handleCloseEditWindow}
        handleClickOutside={handleClickOutsideEditWindow}
        isFormVisible={isModalOpen} >
          <LessonEditWindow
            handleUpdate={handleUpdateInfos}
            lessonId={currentLessonId}
            title={lessonTitle}
            description={lessonDescription}
            content={lessonContent}
            setLessonTitle={setLessonTitle}
            setLessonDescription={setLessonDescription}
            setLessonContent={setLessonContent} />
      </Modal>

      {
        Object.keys(lessons).length < 1
          ? <p className="no-lessons-text">Add lessons to view them in this section</p>
          : Object.keys(lessons).map((lessonId) => {
              return (
                <LessonPreview
                  key={lessonId}
                  lessonId={lessonId}
                  title={lessons[lessonId].title}
                  description={lessons[lessonId].description}
                  content={lessons[lessonId].content}
                  handleEdit={handleOpenEditWindow}
                  handleDelete={handleDeleteLesson} />
              )
            })
      }

    </section>
  );
}
