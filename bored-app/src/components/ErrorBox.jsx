// src/components/ErrorBox.jsx
import React from "react";

export default function ErrorBox({ message }) {
  return (
    <div style={{
      padding: "1rem",
      backgroundColor: "#ffe5e5",
      border: "1px solid #ff0000",
      borderRadius: "8px",
      color: "#900",
      margin: "1rem 0"
    }}>
      <strong>Error:</strong> {message}
    </div>
  );
}
