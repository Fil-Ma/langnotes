import "./lessonPreview.css";

function LessonPreview({
  lessonId,
  title,
  description,
  handleEdit,
  handleDelete
}) {

  return (
    <div className="lesson">
      <div className="lesson-title">
        <h3>{ title }</h3>
      </div>

      <div className="lesson-tools">
        <div className="edit-icon-container" onClick={handleEdit}>
          <i className="fa-solid fa-pencil fa-sm"></i>
          <div className="hover-text">Edit Lesson</div>
        </div>
        <div className="delete-icon-container" onClick={handleDelete}>
          <i className="fa-solid fa-trash"></i>
          <div className="hover-text">Delete Lesson</div>
        </div>
      </div>

      <div className="lesson-description">
        <p>{ description }</p>
      </div>
    </div>
  );
}

export default LessonPreview;
