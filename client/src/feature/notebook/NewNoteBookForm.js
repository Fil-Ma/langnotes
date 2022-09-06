import "./NewNoteBookForm.css";

function NewNoteBookForm() {


  return (
    <div className="new-notebook-form" >
      <form>
        <label htmlFor="name" >Name</label>
        <input type="text" name="name" required />

        <label htmlFor="description" >Description</label>
        <input type="text" name="description" required />

        <input type="submit" />
      </form>
    </div>
  );
}

export default NewNoteBookForm;
