import "./lesson.css";
import { useState } from "react";

import Button from "../../button/Button";

export default function Lesson({
  lesson,
  setLessonTitle,
  setLessonDescription,
  setLessonContent,
  handleUpdate
}) {

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);

  return (
    <div className="lesson-fullscreen">
      {
        isEditingTitle ?
        <form>
          <input
            type = 'text'
            onChange={(e) => setLessonTitle(e.target.value)}
            defaultValue = {lesson.title} />
        </form>
        : <h1 onDoubleClick ={()=> setIsEditingTitle(true)}>{lesson.title}</h1>
      }
      {
        isEditingDescription ?
        <form>
        <input
          type = 'text'
          onChange={(e) => setLessonDescription(e.target.value)}
          defaultValue = {lesson.description} />
        </form>
        : <p onDoubleClick ={()=> setIsEditingDescription(true)}>{lesson.description}</p>
      }
      {
        isEditingContent ?
        <form>
        <input
          type = 'text'
          onChange={(e) => setLessonContent(e.target.value)}
          defaultValue = {lesson.content} />
        </form>
        : <p onDoubleClick ={()=> setIsEditingContent(true)}>{lesson.content}</p>
      }

      <Button
        onClick={(e) => handleUpdate(lesson.lessonId, e)}
        className="white-text orange-background orange-border link">Confirm changes</Button>
    </div>
  );
}
