// src/components/List.jsx
import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function List({ items }) {
  if (!items || items.length === 0) return <p>No activities found.</p>;

  return (
    <div className="list-grid" style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
      {items.map((item) => (
        <Link key={item.key} to={`/items/${item.key}`} style={{ textDecoration: "none" }}>
          <Card item={item} />
        </Link>
      ))}
    </div>
  );
}
