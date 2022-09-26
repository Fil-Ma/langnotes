import { Navigate } from "react-router-dom";

function PrivateRoute({ isAuthenticated, children }) {

  if (isAuthenticated) {
    return children;
  } else {
    console.log("User is not logged in. Redirecting..");
    return <Navigate to="/login" />
  }
};

export default PrivateRoute;
