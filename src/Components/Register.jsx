import React from "react";
import { useState } from "react";
import { API_Path } from "../Helpers/data";

const Register = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_Path}/vendor/vendorregister`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("User registered successfully");
        setUsername("");
        setEmail("");
        setPassword("");
        handleLogin();
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        <label>USERNAME</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <label>EMail</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password.."
        />
        <button type="submit">
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default Register;
