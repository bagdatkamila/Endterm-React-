import React, { useState, useEffect, useRef } from "react";
import { filterActivities } from "../api/boredApi";
import { useDebounce } from "../hooks/useDebounce";
import Card from "../components/Card";

export default function ItemsList() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchParticipants, setSearchParticipants] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const debouncedText = useDebounce(searchText, 500);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (abortControllerRef.current) abortControllerRef.current.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const participantsParam = searchParticipants ? Number(searchParticipants) : undefined;

    filterActivities({ type: searchType, participants: participantsParam }, controller.signal)
      .then((data) => {
        const filtered = data.filter((item) =>
          item.activity.toLowerCase().includes(debouncedText.toLowerCase())
        );
        setActivities(filtered);
        setCurrentPage(1);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message || "Failed to load activities");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [searchType, searchParticipants, debouncedText]);

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentActivities = activities.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(activities.length / itemsPerPage);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Bored Activities</h1>

      {/* Search */}
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
          {[1,2,3,4,5,6,8].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      {/* Error/Loading */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Activities Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
        {currentActivities.map((activity) => (
          <Card key={activity.key} item={activity} />
        ))}
        {activities.length === 0 && !loading && <p>No activities found.</p>}
      </div>

      {/* Pagination */}
      {activities.length > itemsPerPage && (
        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
          <span>Page {currentPage} / {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
}
