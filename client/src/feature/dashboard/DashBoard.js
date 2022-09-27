import "./DashBoard.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Notebook from "../notebook/Notebook";
import EmptyDashboard from "../../components/emptyDashboard/EmptyDashboard";
import { checkLoginStatus } from "../../store/login/auth/auth.actions";

function DashBoard() {

  // const [isDashboardEmpty, setIsDashboardEmpty] = useState(true);
  // const dispatch = useDispatch();
  //
  // dispatch(checkLoginStatus());
  // const notebooks = useSelector((state) => state.user.notebooks);
  //
  // if (notebooks.length > 0) {
  //   setIsDashboardEmpty(false);
  // } else if (notebooks.length === 0 || notebooks === undefined) {
  //   setIsDashboardEmpty(true);
  // }

  // { isDashboardEmpty ? <EmptyDashboard /> : <Notebook /> } fix here and authRouter
  return (
    <main className="dashboard-main">

      <EmptyDashboard />

    </main>
  );
}

export default DashBoard;
