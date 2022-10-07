import "./vocabularyTerm.css";

function VocabularyTerm({
  termId,
  content,
  definition
}) {

  return (
    <div className="vocabulary-term-container">

      <div className="term-content">
        <h3>{content}</h3>
      </div>

      <div className="vocabulary-tools">
        <div className="edit-icon-container" >
          <i className="fa-solid fa-pencil fa-sm"></i>
          <div className="hover-text">Edit Term</div>
        </div>
        <div className="delete-icon-container" >
          <i className="fa-solid fa-trash"></i>
          <div className="hover-text">Delete Term</div>
        </div>
      </div>

      <div className="term-definition">
        <p>{definition}</p>
      </div>

    </div>
  )
}

export default VocabularyTerm;
