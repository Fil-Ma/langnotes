import "./DashBoard.css";
import { useNavigate } from "react-router-dom";
import EmptyDashboard from "../../components/EmptyDashboard";

function DashBoard() {

  const navigate = useNavigate();

  const handleAddNotebookButton = (e) => {
    e.preventDefault();
    navigate("../notebook/new");
  };

  return (
    <main>
      <EmptyDashboard onClick={handleAddNotebookButton} />
    </main>
  );
}

export default DashBoard;
