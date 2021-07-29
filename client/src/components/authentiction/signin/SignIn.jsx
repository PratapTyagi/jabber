import { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const login = () => {};

  return (
    <div className="register_page">
      <div className="register">
        <h2>Sign In</h2>
        <form className="register__form">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />

          <button onClick={login}>Continue</button>
        </form>
        <p className="login__user">
          Don't have an account
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <strong className="login__user__login"> Sign Up</strong>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
