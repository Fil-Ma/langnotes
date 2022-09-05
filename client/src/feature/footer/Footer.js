import "./Footer.css";

function Footer() {
  return (
    <footer>
      <hr />
      <div className="footer-content-container">
        <div className="footer-logo-container">LangNotes</div>
        <div className="footer-copyright">
          <i class="fa fa-copyright" aria-hidden="true"></i> 2022 Company, Inc
        </div>
        <div className="footer-social">
          <i class="fa fa-twitter fa-lg"></i>
          <i class="fa fa-instagram fa-lg"></i>
          <i class="fa fa-facebook-official fa-lg"></i>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
