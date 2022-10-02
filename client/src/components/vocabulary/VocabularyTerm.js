function VocabularyTerm({ termId, content, definition }) {

  return (
    <div className="vocabulary-term-container">
      <h3 className="term-content">
        { content }
      </h3>
      <p className="term-definition">
        { definition }
      </p>
    </div>
  )
}

export default VocabularyTerm;
