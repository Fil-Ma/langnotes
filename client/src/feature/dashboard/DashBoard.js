import "./DashBoard.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

function DashBoard() {

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("../notebook/new");
  };

  return (
    <main>
      <div className="dashboard-add-notebook-container">
        <p>It looks like you don't have any notebook. Please create a new Notebook in your favorite language to start</p>
        <Button onClick={handleClick} className="dashboard-add-notebook">Add NoteBook</Button>
      </div>
    </main>
  );
}

export default DashBoard;
