import "./DashBoard.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import EmptyDashboard from "../../components/emptyDashboard/EmptyDashboard";
import { checkLoginStatus } from '../../store/login/auth/auth.actions';

function DashBoard() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notebooks } = useSelector((state) => state.login.user);

  useEffect(() => {
    dispatch(checkLoginStatus());
    const currentNotebook = notebooks[0];

    if (currentNotebook) {
      navigate(`/notebook/${currentNotebook.id}`);
    }
  }, [notebooks])

  return (
    <main className="dashboard-main">
      <EmptyDashboard />
    </main>
  );
}

export default DashBoard;
