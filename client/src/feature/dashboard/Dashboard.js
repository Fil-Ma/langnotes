import "./Dashboard.css";
import Button from "../../components/Button";

function Dashboard() {

  const handleClick = (e) => {

  }

  return (
    <main>
      <div className="background-image-container">
        <div className="starter" >
          <h1>Get started with LangNotes</h1>
          <p>Quickly and easily get started with Langnotes application, the best tools to help you learn any language.<br />
          Register now and start your experience.</p>
          <Button onClick={handleClick} className="starter-button">Join Now</Button>
        </div>
      </div>
      
      <div className="features">

      </div>
    </main>
  );
}

export default Dashboard;
