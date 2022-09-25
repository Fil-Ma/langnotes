import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { loginUser } from '../../store/login/auth/auth.actions';

function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // manage login when clicked on button
  const handleLogin = async (e) => {
    console.log("Logging in...");
    try {
      setIsLoading(true);
      e.preventDefault();
      await dispatch(loginUser({ email, password }));
      setIsLoading(false);

      console.log("Success! User is now logged in");
      navigate("../dashboard");
    } catch(err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <main className="login-main">
      <div className="login-form-container" >

        <div className="login-form-title">
          <h2>Welcome back!</h2>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label htmlFor="email">Enter your email:</label><br />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              onChange={(e) => setEmail(e.currentTarget.value)}
              required />
          </div>

          <div className="input-container">
            <label htmlFor="pwd">Password:</label><br />
            <input
              type="password"
              id="pwd"
              name="pwd"
              minLength="8"
              maxLength="16"
              placeholder="Password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
              title="Must be between 8 and 16 characters. Should have at least one special character (@$!%*?&), one number, one lowercase letter and one Uppercase letter."
              onChange={(e) => setPassword(e.currentTarget.value)}
              required />
          </div>

          <div className="submit-container">
            <input type="submit" value="Sign In" />
          </div>
        </form>

        <div className="oauth-logins">
          <p>Or Login with:</p>
          <div className="google-login oauth-button">
            <i className="fa-brands fa-google"></i> SignIn with Google
          </div>
          <div className="facebook-login oauth-button">
            <i className="fa-brands fa-facebook-f"></i> SignIn with Facebook
          </div>
        </div>

        <div className="signup-redirect">
          <p>Not a member? <Link to="../signup">Register</Link></p>
        </div>

      </div>
    </main>
  );
}

export default LoginForm;
