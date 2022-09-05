import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./feature/header/Header";
import Dashboard from "./feature/dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Header />
      <Route path="/">
        <Dashboard />
      </Route>
    </Router>
  );
}

export default App;
