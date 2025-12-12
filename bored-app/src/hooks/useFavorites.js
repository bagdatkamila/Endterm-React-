import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { auth } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export function useFavorites() {
  const user = useSelector((state) => state.auth.user);
  const [favorites, setFavorites] = useState([]);

  // Load favorites on mount
  useEffect(() => {
    if (user) {
      const uid = user.uid;
      const fetchFavorites = async () => {
        const docRef = doc(db, "favorites", uid);
        const docSnap = await getDoc(docRef);
        let serverFavs = [];
        if (docSnap.exists()) {
          serverFavs = docSnap.data().items || [];
        }
        // Merge with localStorage
        const localFavs = JSON.parse(localStorage.getItem("favorites")) || [];
        const merged = Array.from(new Set([...serverFavs, ...localFavs]));
        setFavorites(merged);
        await setDoc(docRef, { items: merged }, { merge: true });
        if (localFavs.length > 0) {
          alert("Your local favorites were merged with your account.");
          localStorage.removeItem("favorites");
        }
      };
      fetchFavorites();
    } else {
      // Guest: load from localStorage
      const localFavs = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(localFavs);
    }
  }, [user]);

  const addFavorite = useCallback(
    async (id) => {
      setFavorites((prev) => {
        const newFavs = [...prev, id];
        if (!user) localStorage.setItem("favorites", JSON.stringify(newFavs));
        return newFavs;
      });
      if (user) {
        const uid = user.uid;
        const docRef = doc(db, "favorites", uid);
        await updateDoc(docRef, { items: arrayUnion(id) });
      }
    },
    [user]
  );

  const removeFavorite = useCallback(
    async (id) => {
      setFavorites((prev) => {
        const newFavs = prev.filter((item) => item !== id);
        if (!user) localStorage.setItem("favorites", JSON.stringify(newFavs));
        return newFavs;
      });
      if (user) {
        const uid = user.uid;
        const docRef = doc(db, "favorites", uid);
        await updateDoc(docRef, { items: arrayRemove(id) });
      }
    },
    [user]
  );

  return { favorites, addFavorite, removeFavorite };
}
