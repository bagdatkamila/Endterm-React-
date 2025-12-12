import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFirestoreFavorites, updateFirestoreFavorites } from "../../api/favoritesService";

const initialState = {
  items: [], // список ключей активностей
  loading: false,
  error: null,
};

// Загрузка избранного для пользователя
export const loadFavorites = createAsyncThunk(
  "favorites/load",
  async (uid, { rejectWithValue }) => {
    try {
      return await getFirestoreFavorites(uid);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Сохранение в Firestore
export const saveFavorites = createAsyncThunk(
  "favorites/save",
  async ({ uid, items }, { rejectWithValue }) => {
    try {
      await updateFirestoreFavorites(uid, items);
      return items;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      if (state.items.includes(id)) {
        state.items = state.items.filter((itemId) => itemId !== id);
      } else {
        state.items.push(id);
      }
    },
    setFavorites(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.items = action.payload || [];
        state.loading = false;
      })
      .addCase(loadFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
