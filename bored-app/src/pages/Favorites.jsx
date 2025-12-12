import React from "react";
import { useSelector } from "react-redux";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites.items || []);
  const allItems = useSelector((state) => state.items.items || []);

  const favoriteItems = allItems.filter((item) => favorites.includes(item.key));

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Favorites</h1>
      {favoriteItems.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {favoriteItems.map((item) => (
            <div key={item.key} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
              <h3>{item.activity}</h3>
              <p>Type: {item.type}</p>
              <p>Participants: {item.participants}</p>
              <p>Price: {item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
