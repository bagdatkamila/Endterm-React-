import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, saveFavorites } from "../features/favorites/favoritesSlice";
import { useNavigate } from "react-router-dom";

export default function Card({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites.items || []);
  const user = useSelector((state) => state.auth.user);

  const handleFavorite = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(item.key));

    if (user) {
      const updated = favorites.includes(item.key)
        ? favorites.filter((id) => id !== item.key)
        : [...favorites, item.key];
      dispatch(saveFavorites({ uid: user.uid, items: updated }));
    } else {
      // для гостей сохраняем в localStorage
      const local = JSON.parse(localStorage.getItem("favorites") || "[]");
      const updated = local.includes(item.key) ? local.filter((id) => id !== item.key) : [...local, item.key];
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };

  return (
    <div
      className="card"
      onClick={() => navigate(`/items/${item.key}`)}
      style={{
        border: "1px solid #ddd",
        padding: "1rem",
        borderRadius: "8px",
        backgroundColor: "#fefefe",
        cursor: "pointer",
        transition: "transform 0.2s",
      }}
    >
      <h3 style={{ fontSize: "1.1rem" }}>{item.activity}</h3>
      <p>Type: {item.type}</p>
      <p>Participants: {item.participants}</p>
      <p>Price: {item.price}</p>

      <button
        onClick={handleFavorite}
        style={{ marginTop: "0.5rem", color: favorites.includes(item.key) ? "red" : "grey", cursor: "pointer" }}
      >
        ❤️
      </button>
    </div>
  );
}
