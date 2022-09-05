import "./Header.css";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Nav from "../nav/Nav";
import Button from "../../components/Button";

function Header() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogin = (e) => {

  }

  const handleSignUp = (e) => {

  }

  const handleLogout = (e) => {

  }

  const showDropdownOnClick = (e) => {
    e.preventDefault();
    const dropdownContent = document.getElementById("dropdown-content");

    if (!isMenuOpen) {
      dropdownContent.style.display = "block";
      setIsMenuOpen(true);
    } else {
      dropdownContent.style.display = "none";
      setIsMenuOpen(false);
    }
  };

  /* // This function should close the dropdown list if the user clicks outside the menu
  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = e => {
      console.log(ref);
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        document.getElementById("dropdown-content").style.display = "none";
        console.log("set display none");
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    };
  }, [isMenuOpen]);
  */

  let authenticationButtons = (
    <div className="auth-buttons">
      <Button onClick={handleLogin} className="login button" >Login</Button>
      <Button onClick={handleSignUp} className="sign-up button" >Sign-up</Button>
    </div>
  );

  let profileDropdownMenu = (
    <div className="dropdown-button">
      <Button onClick={handleLogout} className="logout button" >Sign Out</Button>
      <Button onClick={showDropdownOnClick} className="profile-dropdown"><i className="fa fa-caret-down"></i></Button>
      <div id="dropdown-content">
        <div className="dropdown-username">[MyUsername]</div>
        <Link to="profile" className="dropdown-link">Edit Profile</Link>
        <div className="dropdown-divider"></div>
        <Link to="settings" className="dropdown-link">Settings</Link>
      </div>
    </div>
  );

  return (
    <header>
      <div className="logo-container" >Header Logo</div>
      <Nav />
      { isAuthenticated ? profileDropdownMenu : authenticationButtons }
    </header>
  );
}

export default Header;
