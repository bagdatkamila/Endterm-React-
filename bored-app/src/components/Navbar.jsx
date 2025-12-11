import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../features/auth/authSlice";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">BoredApp</Link>

        <Link to="/items">Activities</Link>
        <Link to="/about">About</Link>
        {user && <Link to="/favorites">Favorites</Link>}
      </div>

      <div className="nav-right">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="signup-btn">Sign up</Link>
          </>
        ) : (
          <>
            <Link to="/profile">Profile</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
