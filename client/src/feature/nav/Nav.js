import "./Nav.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Nav() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  let guestNav = (
    <nav>
      <NavLink to="/" end className="nav-link" >Home</NavLink>
      <NavLink to="about" className="nav-link" >About</NavLink>
    </nav>
  );

  let authenticatedUserNav = (
    <nav>
      <NavLink to="support" end className="nav-link" >Support</NavLink>
    </nav>
  );

  return isAuthenticated ? authenticatedUserNav : guestNav;
}

export default Nav;
