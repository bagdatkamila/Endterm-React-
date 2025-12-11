import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [], 
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action) {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    setFavorites(state, action) {
      state.favorites = action.payload; 
    }
  }
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
