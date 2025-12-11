import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "../features/items/itemsSlice";
import { useDebounce } from "../hooks/useDebounce";
import { Link } from "react-router-dom";

// Заглушки Spinner и ErrorBox
const Spinner = () => <div>Loading...</div>;
const ErrorBox = ({ message }) => <div style={{ color: "red" }}>{message}</div>;

export default function ItemsList() {
  const dispatch = useDispatch();
  const { list: activities, loadingList, errorList } = useSelector((state) => state.items);

  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchParticipants, setSearchParticipants] = useState("");

  const debouncedText = useDebounce(searchText, 500);

  useEffect(() => {
    const participantsParam = searchParticipants ? Number(searchParticipants) : undefined;

    dispatch(fetchActivities({ type: searchType, participants: participantsParam }));
  }, [searchType, searchParticipants, debouncedText]);

  // Фильтрация по тексту на клиенте
  const filteredActivities = activities.filter((item) =>
    item.activity.toLowerCase().includes(debouncedText.toLowerCase())
  );

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Bored Activities</h1>

      {/* Поиск и фильтры */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search activity..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ flex: 1, padding: "0.5rem" }}
        />

        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="">All types</option>
          <option value="education">Education</option>
          <option value="recreational">Recreational</option>
          <option value="social">Social</option>
          <option value="charity">Charity</option>
          <option value="cooking">Cooking</option>
          <option value="relaxation">Relaxation</option>
          <option value="busywork">Busywork</option>
        </select>

        <select value={searchParticipants} onChange={(e) => setSearchParticipants(e.target.value)}>
          <option value="">Any participants</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="8">8</option>
        </select>
      </div>

      {/* Ошибка или загрузка */}
      {loadingList && <Spinner />}
      {errorList && <ErrorBox message={errorList} />}

      {/* Список активностей */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
        {filteredActivities.map((activity) => (
          <div key={activity.key} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
            <h3>
              <Link to={`/items/${activity.key}`}>{activity.activity}</Link>
            </h3>
            <p>Type: {activity.type}</p>
            <p>Participants: {activity.participants}</p>
            <p>Price: {activity.price}</p>
            <p>Duration: {activity.duration}</p>
            {activity.link && (
              <a href={activity.link} target="_blank" rel="noopener noreferrer">
                Learn more
              </a>
            )}
          </div>
        ))}
        {filteredActivities.length === 0 && !loadingList && <p>No activities found.</p>}
      </div>
    </div>
  );
}
