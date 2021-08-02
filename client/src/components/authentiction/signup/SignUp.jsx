import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./SignUp.css";

const SignUp = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [image, setImage] = useState(null);
  const history = useHistory();

  const register = async (e) => {
    e.preventDefault();

    if (!name || !email || !password)
      return alert("Name, Email, Password are neccessory");

    if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return alert("Wrong email format");
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    )
      return alert(
        "Password should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );

    let newUser = {
      name,
      email,
      password,
      image,
    };

    try {
      const { data } = await axios.post("/api/v1/users/register", newUser);
      alert(data.error ? `Oops!! ${data.error}` : data.message);
      history.push("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register_page">
      <div className="register">
        <h2>Register</h2>
        <form className="register__form" onSubmit={register}>
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
          <div className="container">
            <div className="button-wrap">
              <label className="button" htmlFor="upload">
                Profile Pic
              </label>
              <input
                id="upload"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>

          <button type="submit">Continue</button>
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
