import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import "./Login.css";

export default function Signup() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== repeat) {
      alert("Passwords do not match");
      return;
    }

    dispatch(registerUser({ email, password }));
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit} className="auth-form">

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Repeat password"
          required
          value={repeat}
          onChange={(e) => setRepeat(e.target.value)}
        />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
