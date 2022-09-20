import "./auth.css";
import { useNavigate } from "react-router-dom";

function LoginForm() {

  const navigate = useNavigate();

  const handleLogin = () => {
    // if login is successfull
    navigate("dashboard");
  };

  return (
    <div className="login-form" >
      <form onSumbit={handleLogin}>
        <label htmlFor="email">Enter your email:</label><br>
        <input type="email" id="email" name="email" placeholder="example@email.com" required />

        <label for="pwd">Password:</label><br>
        <input type="password" id="pwd" name="pwd" minlength="8" placeholder="password" required />

        <input type="submit" >Submit</input>
      </form>
    </div>
  );
}

export default LoginForm;
