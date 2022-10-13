import "./nav.css";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UserNav() {

  const notebooks = useSelector((state) => state.login.user.notebooks);
  let notebookLinks;

  if (notebooks.length > 0) {
    notebookLinks = notebooks.map((element, index) => {
      const link = `/notebook/${element.id}`;
      return <NavLink to={link} key ={index} className="nav-link">{element.name}</NavLink>
    })
  }

  return (
    <div className="nav-notebook-container">
      {
        notebookLinks
      }
      {
        notebooks.length < 3
          ? (
              <div className="nav-add-notebook nav-link">
                <Link to="/notebook/new" className="add-sign link">
                  Add New <i className="fa-solid fa-plus orange-text"></i>
                </Link>
              </div>
            )
          : (
              <div className="nav-add-notebook">

              </div>
            )
      }
    </div>
  );
}
