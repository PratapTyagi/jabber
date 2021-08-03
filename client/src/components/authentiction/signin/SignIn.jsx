import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Missing email or password");
    }

    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
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

    const fetchUser = {
      email,
      password,
    };

    try {
      const {
        data: { message, user, error },
      } = await axios.post("/api/v1/users/login", fetchUser);

      alert(message ? message : error);
      localStorage.setItem("currentUser", JSON.stringify(user));

      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register_page">
      <div className="register">
        <h2>Sign In</h2>
        <form className="register__form" onSubmit={login}>
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

          <button type="submit">Continue</button>
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
