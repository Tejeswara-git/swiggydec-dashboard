import React from "react";
import { useState } from "react";
import { API_Path } from "../Helpers/data";

const Login = ({ showWelcomePage, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_Path}/vendor/vendorlogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      console.log("Login successful");
      setEmail("");
      setPassword("");
      alert("Login successful");
      localStorage.setItem("token", data.token);
      setToken(data.token);
      showWelcomePage();
    } else {
      console.log("Login failed");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <label>EMail</label>
        <input
          type="email"
          placeholder="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>PASSWORD</label>
        <input
          type="password"
          placeholder="password.."
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
