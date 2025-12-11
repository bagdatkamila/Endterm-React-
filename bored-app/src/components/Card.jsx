// src/components/Card.jsx
import React from "react";

export default function Card({ item }) {
  return (
    <div className="card" style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "8px", backgroundColor: "#fefefe", transition: "transform 0.2s" }}>
      <h3 style={{ fontSize: "1.1rem" }}>{item.activity}</h3>
      <p>Type: {item.type}</p>
      <p>Participants: {item.participants}</p>
      <p>Price: {item.price}</p>
    </div>
  );
}
