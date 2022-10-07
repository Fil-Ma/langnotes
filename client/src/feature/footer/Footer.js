import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <hr />
      <div className="footer-content-container">
        <div className="footer-logo-container">LangNotes</div>

        <div className="footer-copyright">
          <i className="fa-regular fa-copyright"></i> 2022 MyCompany Inc.
        </div>

        <div className="footer-social">
          <Link to="#" className="footer-social-link">
            <i className="fa-brands fa-twitter fa-lg"></i>
          </Link>

          <Link to="#" className="footer-social-link">
            <i className="fa-brands fa-instagram fa-lg"></i>
          </Link>

          <Link to="#" className="footer-social-link">
            <i className="fa-brands fa-square-facebook fa-lg"></i>
          </Link>
        </div>
      </div>
    </footer>
  );
}
