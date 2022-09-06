import "./Home.css";
import Button from "../../components/Button";

function Home() {

  const handleClick = (e) => {

  }

  return (
    <main>
      <section className="starter-container">
        <div className="starter" >
          <h1>Get started with LangNotes</h1>
          <p>Quickly and easily get started with Langnotes application, the best tools to help you learn any language.<br />
          Register now and start your experience.</p>
          <Button onClick={handleClick} className="starter-button">Join Now</Button>
        </div>
      </section>

      <section className="features">
        <div className="features-title">
          <h1>Features</h1>
          <hr />
        </div>
        <div className="features-wrapper">

          <div className="feature-item top-row first-column">
            <div className="feature-icon">Icon</div>
            <div className="feature-text">
              <h2>Featured title</h2>
              <p>Paragraph of text beneath the heading to explain the heading.</p>
            </div>
          </div>

          <div className="feature-item top-row second-column">
            <div className="feature-icon">Icon</div>
            <div className="feature-text">
              <h2>Featured title</h2>
              <p>Paragraph of text beneath the heading to explain the heading.</p>
            </div>
          </div>

          <div className="feature-item top-row third-column">
            <div className="feature-icon">Icon</div>
            <div className="feature-text">
              <h2>Featured title</h2>
              <p>Paragraph of text beneath the heading to explain the heading.</p>
            </div>
          </div>

          <div className="feature-item top-row fourth-column">
            <div className="feature-icon">Icon</div>
            <div className="feature-text">
              <h2>Featured title</h2>
              <p>Paragraph of text beneath the heading to explain the heading.</p>
            </div>
          </div>

          <div className="feature-item bottom-row first-column">
            <div className="feature-icon">Icon</div>
            <div className="feature-text">
              <h2>Featured title</h2>
              <p>Paragraph of text beneath the heading to explain the heading.</p>
            </div>
          </div>

          <div className="feature-item bottom-row second-column">
            <div className="feature-icon">Icon</div>
            <div className="feature-text">
              <h2>Featured title</h2>
              <p>Paragraph of text beneath the heading to explain the heading.</p>
            </div>
          </div>

          <div className="feature-item bottom-row third-column">
            <div className="feature-icon">Icon</div>
            <div className="feature-text">
              <h2>Featured title</h2>
              <p>Paragraph of text beneath the heading to explain the heading.</p>
            </div>
          </div>

          <div className="feature-item bottom-row fourth-column">
            <div className="feature-icon">Icon</div>
            <div className="feature-text">
              <h2>Featured title</h2>
              <p>Paragraph of text beneath the heading to explain the heading.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
