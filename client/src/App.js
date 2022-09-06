import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./feature/header/Header";
import Footer from "./feature/footer/Footer";
import Home from "./feature/home/Home";
import WorkDesk from "./feature/workdesk/WorkDesk";
import Support from "./feature/support/Support";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route
          path="/"
          element={<Home />} />
        <Route
          path="/workdesk"
          element={<WorkDesk />} />
        <Route
          path="/support"
          element={<Support />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
