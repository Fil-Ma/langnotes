import "./Header.css";
import Nav from "../nav/Nav";
import Button from "../../components/Button";

function Header() {

  const handleLogin = (e) => {

  }

  const handleSignUp = (e) => {

  }

  return (
    <header>
      <div className="logo" >Header Logo</div>
      <Nav />
      <div className="auth-buttons">
        <Button onClick={handleLogin} className="login button" >Login</Button>
        <Button onClick={handleSignUp} className="sign-up button" >Sign-up</Button>
      </div>
    </header>
  );
}

export default Header;
