import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PageLayout from "./components/pageLayout/PageLayout";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

import Home from "./feature/home/Home";
import DashBoard from "./feature/dashboard/DashBoard";
import NotebookContainer from "./feature/notebook/NotebookContainer";
import NewNotebookForm from "./feature/notebook/NewNotebookForm/NewNotebookForm";
import Support from "./feature/support/Support";
import LoginForm from "./feature/auth/LoginForm";
import SignUpForm from "./feature/auth/SignUpForm";

import { useSelector } from "react-redux";

function App() {

  const { isAuthenticated } = useSelector(state => state.login.auth);

  return (
    <Router>
      <Routes>

        <Route
          path="/login"
          element={<LoginForm />} />

        <Route
          path="/signup"
          element={<SignUpForm />} />

        <Route element={<PageLayout isAuthenticated={isAuthenticated} />}>

          <Route
            path="/"
            element={<Home />} />
          <Route
            path="/support"
            element={<Support />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <DashBoard />
              </PrivateRoute>
            } />

          <Route
            path="/notebook/new"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <NewNotebookForm />
              </PrivateRoute>
            } />

          <Route
            path="/notebook/:notebookId"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <NotebookContainer />
              </PrivateRoute>
            } />

        </Route>

      </Routes>
    </Router>
  );
}

export default App;
