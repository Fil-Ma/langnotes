import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from "./feature/header/Header";
import Footer from "./feature/footer/Footer";

import Home from "./feature/home/Home";
import DashBoard from "./feature/dashboard/DashBoard";
import NoteBook from "./feature/notebook/NoteBook";
import NewNoteBookForm from "./feature/notebook/NewNoteBookForm";
import Support from "./feature/support/Support";
import LoginForm from "./feature/auth/LoginForm";
import SignUpForm from "./feature/auth/SignUpForm";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>

      <Routes>

        <Route
          path="/"
          element={<Home />} />

        <Route
          path="/login"
          element={<LoginForm />} />

        <Route
          path="/signup"
          element={<SignUpForm />} />

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

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
