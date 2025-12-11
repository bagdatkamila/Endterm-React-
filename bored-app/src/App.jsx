import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ItemsList from "./pages/ItemsList";
import ItemDetails from "./pages/ItemDetails";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/items" element={<ItemsList />} />
          <Route path="/items/:id" element={<ItemDetails />} />
          <Route path="/favorites" element={<Favorites />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
      </main>
    </Router>
  );
}
