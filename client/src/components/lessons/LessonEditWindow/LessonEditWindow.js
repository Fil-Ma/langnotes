import "./lessonEditWindow.css";
import { useState } from "react";
import Button from "../../button/Button";

export default function LessonEditWindow({
  handleUpdate,
  lessonId,
  title,
  description,
  content,
  setLessonTitle,
  setLessonDescription,
  setLessonContent
}) {

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  return (
    <div className="lesson-edit-inputs">
      <h3>Double click on any section to edit</h3>

      <div className="inputs-container">
        <h4>Title</h4>

        {
          isEditingTitle
            ? (
              <form onBlur={(e) => setIsEditingTitle(false)}>
                <input
                  type="text"
                  value={title}
                  maxLength="50"
                  autoFocus
                  onChange={(e) => setLessonTitle(e.target.value)} />
              </form>
            ) : <span onDoubleClick={() => setIsEditingTitle(true)}>{title}</span>
        }

        <h4>Description</h4>

        {
          isEditingDescription
            ? (
              <form onBlur={(e) => setIsEditingDescription(false)}>
                <input
                  type="text"
                  value={description}
                  maxLength="100"
                  autoFocus
                  onChange={(e) => setLessonDescription(e.target.value)} />
              </form>
            ) : <span onDoubleClick={() => setIsEditingDescription(true)}>{description}</span>
        }

        <h4>Content</h4>

        {
          isEditingContent
            ? (
              <form onBlur={(e) => setIsEditingContent(false)}>
                <textarea
                  value={content}
                  rows="4"
                  maxLength="200"
                  autoFocus
                  onChange={(e) => setLessonContent(e.target.value)} />
              </form>
            ) : <span onDoubleClick={() => setIsEditingContent(true)}>{content}</span>
        }
      </div>

      <Button
        className="white-text orange-background orange-border link update-changes-btn"
        onClick={(e) => handleUpdate(lessonId, e)}>
          Update changes
      </Button>
    </div>
  );
}
