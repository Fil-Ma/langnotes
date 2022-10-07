import "./termEditWindow.css";
import { useState } from "react";
import Button from "../../button/Button";

export default function TermEditWindow({
  termId,
  content,
  definition,
  setContent,
  setDefinition,
  handleUpdate
}) {

  const [isEditingContent, setIsEditingContent] = useState(false);
  const [isEditingDefinition, setIsEditingDefinition] = useState(false);

  return (
    <div className="term-edit-window">
      <h3>Double click on any section to edit</h3>

      <div className="term-edit-inputs-container">
        <h4>Content</h4>

        {
          isEditingContent
            ? (
              <form onBlur={() => setIsEditingContent(false)}>
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)} />
              </form>
            ) : <span onDoubleClick={() => setIsEditingContent(true)}>{content}</span>
        }

        <h4>Definition</h4>

        {
          isEditingDefinition
            ? (
              <form onBlur={() => setIsEditingDefinition(false)}>
                <textarea
                  type="text"
                  value={definition}
                  rows="4"
                  onChange={(e) => setDefinition(e.target.value)} />
              </form>
            ) : <span onDoubleClick={() => setIsEditingDefinition(true)}>{definition}</span>
        }

      </div>

      <Button
        className="white-text orange-background orange-border link update-changes-btn"
        onClick={(e) => handleUpdate(termId, e)}>
          Update changes
      </Button>

    </div>
  );
}
