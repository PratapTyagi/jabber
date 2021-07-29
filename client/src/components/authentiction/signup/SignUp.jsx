import { useState } from "react";
import { Link, Route } from "react-router-dom";
import SignIn from "../signin/SignIn";

import "./SignUp.css";

const SignUp = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [image, setImage] = useState("Profile pic");

  const register = () => {};

  return (
    <div className="register_page">
      <div className="register">
        <h2>Register</h2>
        <form className="register__form">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
            autoComplete="false"
          />

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
          <div class="container">
            <div class="button-wrap">
              <label class="button" for="upload">
                Profile Pic
              </label>
              <input id="upload" type="file" />
            </div>
          </div>

          <button onClick={register}>Continue</button>
        </form>
        <p className="login__user">
          Already have an account
          <Link to="/signin" style={{ textDecoration: "none" }}>
            <strong className="login__user__login"> Sign In</strong>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
