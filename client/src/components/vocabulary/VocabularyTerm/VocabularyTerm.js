import "./vocabularyTerm.css";

export default function VocabularyTerm({
  termId,
  content,
  definition,
  handleEdit,
  handleDelete
}) {

  return (
    <div className="vocabulary-term-container">

      <div className="term-content">
        <h3>{content}</h3>
      </div>

      <div className="vocabulary-tools">
        <div className="term-edit-icon-container" onClick={(e) => handleEdit(termId, e)} >
          <i className="fa-solid fa-pencil fa-sm"></i>
          <div className="term-hover-text">Edit Term</div>
        </div>
        <div className="term-delete-icon-container" onClick={(e) => handleDelete(termId, e)}>
          <i className="fa-solid fa-trash"></i>
          <div className="term-hover-text">Delete Term</div>
        </div>
      </div>

      <div className="term-definition">
        <p>{definition}</p>
      </div>

    </div>
  )
}
