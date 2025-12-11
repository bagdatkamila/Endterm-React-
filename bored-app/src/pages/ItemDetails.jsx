import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchActivityByKey, clearSelectedItem } from "../features/items/itemsSlice";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";

export default function ItemDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedItem, loadingItem, errorItem } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchActivityByKey(id));

    return () => dispatch(clearSelectedItem());
  }, [id]);

  if (loadingItem) return <Spinner />;
  if (errorItem) return <ErrorBox message={errorItem} />;
  if (!selectedItem) return null;

  return (
    <div className="item-details">
      <h2>{selectedItem.activity}</h2>
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
            Link: <a href={selectedItem.link}>{selectedItem.link}</a>
          </li>
        )}
      </ul>
    </div>
  );
}
