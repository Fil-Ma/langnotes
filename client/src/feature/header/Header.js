import "./Header.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Nav from "../nav/Nav";
import Button from "../../components/button/Button";
import { logoutUser } from '../../store/login/auth/auth.actions';

export default function Header({ isAuthenticated }) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownContent = document.getElementById("dropdown-content");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // event handler to manage dropdown menu
  const showDropdownOnClick = (e) => {
    e.preventDefault();

    if (!isMenuOpen) {
      dropdownContent.style.display = "block";
      setIsMenuOpen(true);
    } else {
      dropdownContent.style.display = "none";
      setIsMenuOpen(false);
    }
  };

  // manages logout
  const logout = async (e) => {
    console.log("Logging out...");
    try {
      e.preventDefault();
      await dispatch(logoutUser());
      await dispatch({ type: 'USER_LOGOUT' });
      navigate("/");
    } catch(err) {
      console.log(err);
    }
  }

  let authenticationButtons = (
    <div className="auth-buttons-container">
      <Link to="/login" className="login link orange-text white-background">Login</Link>
      <Link to="/signup" className="sign-up link white-text orange-background">Sign-up</Link>
    </div>
  );

  let profileDropdownMenu = (
    <div className="auth-buttons-container">
      <Button onClick={logout} className="logout-button white-background" >Sign Out</Button>

      <Button onClick={showDropdownOnClick} className="profile-dropdown white-background">
        <i className="fa-solid fa-caret-down"></i>
      </Button>

      <div id="dropdown-content">
        <div className="dropdown-username">[MyUsername]</div>
        <Link to="profile" className="dropdown-item link">Edit Profile</Link>
        <div className="dropdown-divider"></div>
        <Link to="settings" className="dropdown-item link">Settings</Link>
      </div>
    </div>
  );

  return (
    <header>
      <div className="logo-container" >LangNotes</div>
      <Nav isAuthenticated={isAuthenticated} />
      { isAuthenticated ? profileDropdownMenu : authenticationButtons }
    </header>
  );
}
