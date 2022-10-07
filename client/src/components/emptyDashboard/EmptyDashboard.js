import "./EmptyDashboard.css";
import { Link } from "react-router-dom";

export default function EmptyDashboard() {

  return (
    <div className="empty-dashboard-container">
      <p>It looks like you don't have any notebook. Please create a new Notebook in your favorite language to start</p>
      <Link to="/notebook/new" className="dashboard-add-btn link orange-background white-text">Add NoteBook</Link>
    </div>
  );
};
