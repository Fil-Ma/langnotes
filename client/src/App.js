import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./feature/header/Header";
import Footer from "./feature/footer/Footer";
import Dashboard from "./feature/dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route
          path="/"
          element={<Dashboard />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
