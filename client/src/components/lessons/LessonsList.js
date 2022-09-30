import "./lessons.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Lesson from "./Lesson.js";
import { loadAllLessons } from "../../store/notebook/lesson/lesson.actions";

function LessonsList({ notebookId }) {

  const dispatch = useDispatch();
  const lessons = useSelector((state) => state.notebook.lesson);

  useEffect(() => {
     dispatch(loadLessons(notebookId));

  }, [lessons]);

  // lessons.forEach(lesson => <Lesson lessonData=lesson />);

  return (
    <section className="lessons-container">
      <h2>Lessons</h2>
      <p>(+) Add New</p>

      <Lesson title="Lesson title" description="Description" />
      <Lesson title="Lesson title" description="Description" />
      <Lesson title="Lesson title" description="Description" />
      <Lesson title="Lesson title" description="Description" />
      <Lesson title="Lesson title" description="Description" />
      <Lesson title="Lesson title" description="Description" />

    </section>
  );
}

export default LessonsList;
