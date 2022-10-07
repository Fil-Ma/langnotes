import "./auth.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from '../../store/login/auth/auth.actions';

export default function SignUpForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordRepeatError, setIsPasswordRepeatError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handle registration
  const handleSignup = async (e) => {
    console.log("Signing up...");

    if (confirmPassword !== password) {
      throw new Error("The passwords do not match");
    }

    try {
      e.preventDefault();
      await dispatch(registerUser({ email, password }));

      console.log("Success! User registered");
      navigate("/login");
    } catch(err) {
      console.log(err);
    }
  };

  // check if confirm password corresponds
  useEffect(() => {
    if (confirmPassword !== password) {
      setIsPasswordRepeatError(true);
    } else {
      setIsPasswordRepeatError(false);
    }
  }, [confirmPassword]);


  return (
    <main className="signup-main">
      <div className="signup-form-container white-background" >

        <div className="signup-form-title">
          <h2>Join LangNotes</h2>
        </div>

        <form onSubmit={handleSignup}>
          <div className="input-container">
            <label htmlFor="email">Enter your email:</label><br />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              onChange={(e) => setEmail(e.target.value)}
              maxLength="100"
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
              onChange={(e) => setPassword(e.target.value)}
              required />
          </div>

          <div className="input-container">
            <label htmlFor="confirmPassword">Confirm Password:</label><br />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              minLength="8"
              maxLength="16"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required />
              { isPasswordRepeatError && <p className="matching-password-error"><i className="fa-solid fa-triangle-exclamation"></i> The passwords do not match</p> }
          </div>

          <div className="submit-container">
            <input type="submit" value="Register" />
          </div>
        </form>

        <div className="oauth-signup">
          <p>Or Signup with:</p>

          <Link to="/api/auth/google" className="google-signup oauth-button link">
            <i className="fa-brands fa-google"></i> SignIn with Google
          </Link>

          <Link to="/api/auth/facebook" className="facebook-signup oauth-button link">
            <i className="fa-brands fa-facebook-f"></i> SignIn with Facebook
          </Link>
        </div>

      </div>
    </main>
  );
}
