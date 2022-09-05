import "./Nav.css";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <NavLink to="/" end className="nav-link" >Home</NavLink>
      <NavLink to="about" className="nav-link" >About</NavLink>
    </nav>
  );
}

export default Nav;
