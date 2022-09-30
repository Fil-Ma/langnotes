import "./DashBoard.css";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';

import Notebook from "../notebook/Notebook";
import EmptyDashboard from "../../components/emptyDashboard/EmptyDashboard";
import { checkLoginStatus } from "../../store/login/auth/auth.actions";

function DashBoard() {

  const [isDashboardEmpty, setIsDashboardEmpty] = useState(true);
  const dispatch = useDispatch();

  // select notebook in the state
  const notebooks = useSelector((state) => state.login.user.notebooks);
  const currentNotebook = notebooks[0];

  // update notebooks in the state
  useEffect(() => {
    dispatch(checkLoginStatus());

    if (notebooks.length > 0) {
      setIsDashboardEmpty(false);
    } else if (notebooks.length === 0) {
      setIsDashboardEmpty(true);
    }
  }, [notebooks]);

  return (
    <main className="dashboard-main">

      { isDashboardEmpty ? <EmptyDashboard /> : <Notebook notebook={currentNotebook} /> }

    </main>
  );
}

export default DashBoard;
