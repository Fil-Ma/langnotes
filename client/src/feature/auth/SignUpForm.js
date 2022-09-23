import "./auth.css";
import { useState } from "react";

function SignUpForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const handleSignup = () => {

  };

  const validatePassword = () => {
    if (confirmPassword !== password) {
      setPasswordError("Password and Confirm Password does not match.");
    }
    console.log(passwordError);
  };

  return (
    <main className="signup-main">
      <div className="signup-form-container" >

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
              onChange={(e) =>  {
                setConfirmPassword(e.tartget.value);
                validatePassword();
              }}
              required />
            <p className="confirm-password-error">{passwordError ? passwordError : ""}</p>
          </div>


          <div className="submit-container">
            <input type="submit" value="Register" />
          </div>
        </form>

        <div className="oauth-signup">
          <p>Or Signup with:</p>
          <div className="google-signup oauth-button">
            <i className="fa-brands fa-google"></i> SignIn with Google
          </div>
          <div className="facebook-signup oauth-button">
            <i className="fa-brands fa-facebook-f"></i> SignIn with Facebook
          </div>
        </div>

      </div>
    </main>
  );
}

export default SignUpForm;
