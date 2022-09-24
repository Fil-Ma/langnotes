import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PageLayout from "./components/pageLayout/PageLayout";

import Home from "./feature/home/Home";
import DashBoard from "./feature/dashboard/DashBoard";
import NoteBook from "./feature/notebook/NoteBook";
import NewNoteBookForm from "./feature/notebook/NewNoteBookForm";
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
            path="/dashboard"
            element={<DashBoard />} />

          <Route
            path="/notebook/new"
            element={<NewNoteBookForm />} />
          <Route
            path="/notebook"
            element={<NoteBook />} />

          <Route
            path="/support"
            element={<Support />} />

        </Route>

      </Routes>
    </Router>
  );
}

export default App;
