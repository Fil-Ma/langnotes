import "./nav.css";
import { NavLink } from "react-router-dom";
import UserNav from "./UserNav";

export default function Nav({ isAuthenticated }) {
  let nav = (
      <nav>
        <NavLink to="/" end className="nav-link" >Home</NavLink>
        <NavLink to="/about" className="nav-link" >About</NavLink>
      </nav>
  );

  if (isAuthenticated) {
    nav = (
        <nav>
          <UserNav />
          <NavLink to="/support" end className="nav-link" >Support</NavLink>
        </nav>
    )
  }
  return nav;
}
