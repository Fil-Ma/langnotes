import "./newTermForm.css";

export default function NewTermForm({
  onSubmit,
  content,
  definition,
  setContent,
  setDefinition
}) {

  return (
    <form onSubmit={onSubmit} >
      <div>
        <label htmlFor="termContent">Content:</label><br />
        <input
          type="text"
          id="termContent"
          name="termContent"
          required
          maxLength="20"
          value={content}
          onChange={(e) => setContent(e.target.value)} />
      </div>

      <div>
        <label htmlFor="termDefinition">Definition:</label><br />
        <textarea
          name="termDefinition"
          id="termDefinition"
          required
          rows="3"
          maxLength="200"
          value={definition}
          onChange={(e) => setDefinition(e.target.value)} ></textarea>
      </div>

      <div >
        <input
          className="orange-background white-text orange-border link"
          type="submit"
          value="Add Term to your vocabulary" />
      </div>
    </form>
  )
}
