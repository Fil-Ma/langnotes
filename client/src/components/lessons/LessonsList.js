import "./lessons.css";
import Lesson from "./Lesson.js";

function LessonsList() {


  return (
    <section className="lessons-container">
      <h2>Lessons</h2>
      <p>(+) Add New</p>

      <Lesson title="Lesson title" description="Description" />
      <Lesson title="Lesson title" description="Description" />
      <Lesson title="Lesson title" description="Description" />
      <Lesson title="Lesson title" description="Description" />

    </section>
  );
}

export default LessonsList;
