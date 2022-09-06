import "./NewNoteBookForm.css";

function NewNoteBookForm() {


  return (
    <div className="new-notebook-form" >
      <form>
        <div className="form-row">
          <div className="newNoteBookName-container">
            <label htmlFor="newNoteBookName" >Name</label>
            <br />
            <input type="text" id="newNoteBookName" required />
          </div>

          <div className="newNoteBookLanguage-container">
            <label htmlFor="newNoteBookLanguage">Language</label>
            <select id="newNoteBookLanguage" required>
              <option defaultValue>Choose...</option>
              <option>English</option>
            </select>
          </div>
        </div>

        <div className="newNoteBookDescription-container">
          <label htmlFor="newNoteBookDescription" >Description</label>
          <textarea id="newNoteBookDescription" rows="3" required placeholder="Notebook for my language class.." ></textarea>
        </div>

        <input type="submit" />
      </form>
    </div>
  );
}

export default NewNoteBookForm;
