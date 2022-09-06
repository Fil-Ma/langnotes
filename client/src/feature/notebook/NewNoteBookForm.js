import "./NewNoteBookForm.css";

function NewNoteBookForm() {


  return (
    <div className="new-notebook-form" >
      <form>
        <label htmlFor="newNoteBookName" >Name</label>
        <input type="text" id="newNoteBookName" required />

        <label htmlFor="newNoteBookLanguage">Language</label>
        <select id="newNoteBookLanguage" required>
          <option selected>Choose...</option>
          <option>English</option>
        </select>

        <label htmlFor="newNoteBookDescription" >Description</label>
        <textarea id="newNoteBookDescription" rows="3" required placeholder="Notebook for my language class.." ></textarea>

        <input type="submit" >Submit</input>
      </form>
    </div>
  );
}

export default NewNoteBookForm;
