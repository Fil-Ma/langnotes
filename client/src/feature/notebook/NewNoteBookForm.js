import "./NewNotebookForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNotebook } from "../../store/login/user/user.actions";

export default function NewNotebookForm() {

  const [notebookName, setNotebookName] = useState("");
  const [notebookLanguage, setNotebookLanguage] = useState("");
  const [notebookDescription, setNotebookDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle submission of new notebook
  const handleNotebookSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addNotebook({
        name: notebookName,
        language: notebookLanguage,
        description: notebookDescription
      }));
      navigate("/dashboard");

    } catch(err) {
      console.log(err);
    }
  };

  return (
    <main className="add-notebook-main">
      <div className="new-notebook-form white-background" >
        <form onSubmit={handleNotebookSubmit}>

          <div className="input-row">
            <div className="input-container">
              <label htmlFor="notebookName" >Name:</label><br />
              <input
                type="text"
                id="notebookName"
                onChange={(e) => setNotebookName(e.target.value) }
                required />
            </div>

            <div className="input-container">
              <label htmlFor="noteBookLanguage">Language:</label><br />
              <select
                id="noteBookLanguage"
                onChange={(e) => setNotebookLanguage(e.target.value) }
                required >
                  <option defaultValue>Choose...</option>
                  <option>English</option>
                  <option>Italian</option>
                  <option>French</option>
                  <option>Chinese</option>
                  <option>Japanese</option>
              </select>
            </div>
          </div>

          <div className="input-container">
            <label htmlFor="notebookDescription" >Description</label><br />
            <textarea
              id="notebookDescription"
              placeholder="Notebook for my language class.."
              onChange={(e) => setNotebookDescription(e.target.value) }
              required ></textarea>
          </div>

          <div className="submit-container white-color">
            <input type="submit" value="Add Notebook" />
          </div>

        </form>
      </div>
    </main>
  );
}
