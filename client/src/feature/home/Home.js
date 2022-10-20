import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {

  return (
    <main className="home-main">
      <section className="starter-container">
        <div className="starter white-background" >
          <h1>Get started with LangNotes</h1>
          <p>Quickly and easily get started with Langnotes application, the best tools to help you learn any language.<br />
          Register now and start your experience.</p>
          <Link to="signup" className="starter-button orange-background link white-text">Join Now</Link>
        </div>
      </section>

      <section className="features white-background">
        <div className="features-title">
          <h1>Features</h1>
          <hr />
        </div>
        <div className="features-wrapper">

          <div className="feature-item top-row first-column">
            <div className="feature-icon">Icon</div>
            <div className="feature-text">
              <h2>Cloud based</h2>
              <p>Paragraph of text beneath the heading to explain the heading.</p>
            </div>
          </div>

          <div className="feature-item top-row second-column">
            <div className="feature-icon">Icon</div>
            <div className="feature-text">
              <h2>Interactive learning</h2>
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
