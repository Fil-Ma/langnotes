import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../components/button/Button";
import { loginUser, googleLogin } from '../../store/login/auth/auth.actions';

export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginError = useSelector((state) => state.login.auth.error);

  // manage login when clicked on button
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      await dispatch(loginUser({ email, password }));

      navigate("/dashboard");

    } catch(err) {
      console.log(err);
    }
  };

  const handleGoogleLogin = async (e) => {
    try {
      e.preventDefault();
      await dispatch(googleLogin());

      navigate("/dashboard");
    } catch(err) {
      console.log(err);
    }
  }

  const handleFacebookLogin = async (e) => {
    try {
      e.preventDefault();

    } catch(err) {
      console.log(err);
    }
  }

  return (
    <main className="login-main">
      <div className="login-form-container white-background" >

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
          { loginError && <p className="matching-password-error"><i className="fa-solid fa-triangle-exclamation"></i> loginError.message</p> }

          <div className="submit-container">
            <input type="submit" value="Sign In" />
          </div>
        </form>

        <div className="oauth-logins">
          <p>Or Login with:</p>

          <Button
            className="google-login oauth-button link"
            onClick={handleGoogleLogin}><i className="fa-brands fa-google"></i> SignIn with Google</Button>

          <Button
            className="facebook-login oauth-button link"
            onClick={handleFacebookLogin}><i className="fa-brands fa-facebook-f"></i> SignIn with Facebook</Button>
        </div>

        <div className="signup-redirect">
          <p>Not a member? <Link to="../signup" className="default-link">Register</Link></p>
        </div>

      </div>
    </main>
  );
}
