import Button from "./Button";

const EmptyDashboard = ({ handleAddNotebookButton }) => {

  return (
    <div className="dashboard-add-notebook-container">
      <p>It looks like you don't have any notebook. Please create a new Notebook in your favorite language to start</p>
      <Button onClick={handleAddNotebookButton} className="dashboard-add-notebook">Add NoteBook</Button>
    </div>
  );
};

export default EmptyDashboard;
