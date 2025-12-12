// src/pages/Signup.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authSlice"; // redux thunk
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Проверка совпадения паролей
    if (password !== repeat) {
      setError("Passwords do not match");
      return;
    }

    // Проверка сложности пароля: 8+ chars, 1 спецсимвол, 1 цифра
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters, include 1 number and 1 special character"
      );
      return;
    }

    try {
      // Диспатчим thunk для регистрации
      const resultAction = await dispatch(registerUser({ email, password }));
      if (registerUser.fulfilled.match(resultAction)) {
        // Успешная регистрация → редирект на профиль
        navigate("/profile");
      } else {
        // Ошибка регистрации
        setError(resultAction.payload || "Failed to register");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        {error && <div className="error-box">{error}</div>}

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
