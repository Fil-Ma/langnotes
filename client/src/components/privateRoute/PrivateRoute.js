import { Navigate } from "react-router-dom";

function PrivateRoute({ isAuthenticated, children }) {

  if (isAuthenticated) {
    console.log("user is isAuthenticated");
    console.log(isAuthenticated);
    return children;
  } else {
    console.log("not authorized")
    console.log("redirecting")
    return <Navigate to="/login" />
  }
};

export default PrivateRoute;
