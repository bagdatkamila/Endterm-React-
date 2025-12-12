// src/pages/Profile.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { updateProfilePicture } from "../api/profileService"; // сервис для Firestore
import "./Profile.css"; // отдельный файл для стилей

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Проверка типа файла
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (jpg/png).");
      return;
    }

    setLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        // Отправляем данные в Firestore через сервис
        const photoURL = await updateProfilePicture(user.uid, reader.result);

        // Обновляем глобальный auth state
        dispatch(setUser({ ...user, photoURL }));
      } catch (err) {
        console.error(err);
        setError("Failed to upload profile picture.");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      {loading && <p className="status-text">Uploading...</p>}
      {error && <p className="status-text error">{error}</p>}

      <div className="profile-card">
        <img
          src={user?.photoURL || "/default-avatar.png"}
          alt="Profile"
          className="profile-avatar"
        />
        <div className="profile-info">
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>UID:</strong> {user?.uid}</p>
        </div>
      </div>

      <div className="profile-upload">
        <label className="upload-label">
          Change Profile Picture
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="upload-input"
          />
        </label>
      </div>
    </div>
  );
}
