import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  fetchActivityByKey,
  clearSelectedItem,
} from "../features/items/itemsSlice";

import { toggleFavorite } from "../features/favorites/favoritesSlice";

import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";

export default function ItemDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedItem, loadingItem, errorItem } = useSelector(
    (state) => state.items
  );

  const favoriteItems = useSelector((state) => state.favorites.items);
  const isFavorite = favoriteItems.includes(id);

  useEffect(() => {
    dispatch(fetchActivityByKey(id));
    return () => dispatch(clearSelectedItem());
  }, [id, dispatch]);

  if (loadingItem) return <Spinner />;
  if (errorItem) return <ErrorBox message={errorItem} />;
  if (!selectedItem) return null;

  return (
    <div className="item-details" style={{ padding: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h2 style={{ margin: 0 }}>{selectedItem.activity}</h2>

        {/* Favorite button */}
        <button
          onClick={() => dispatch(toggleFavorite(id))}
          style={{
            fontSize: "28px",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isFavorite ? "💖" : "🤍"}
        </button>
      </div>

      <ul>
        <li>Type: {selectedItem.type}</li>
        <li>Participants: {selectedItem.participants}</li>
        <li>Price: {selectedItem.price}</li>
        <li>Availability: {selectedItem.availability}</li>
        <li>Accessibility: {selectedItem.accessibility}</li>
        <li>Duration: {selectedItem.duration}</li>
        <li>Kid Friendly: {selectedItem.kidFriendly ? "Yes" : "No"}</li>

        {selectedItem.link && (
          <li>
            Link:{" "}
            <a href={selectedItem.link} target="_blank" rel="noopener noreferrer">
              {selectedItem.link}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
