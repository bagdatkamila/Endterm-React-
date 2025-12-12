import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { filterActivities, getActivityByKey } from "../../api/boredApi";

const initialState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
  loadingItem: false,
  errorItem: null,
};

// Получение деталей
export const fetchActivityByKey = createAsyncThunk(
  "items/fetchActivityByKey",
  async (key, { rejectWithValue }) => {
    try {
      return await getActivityByKey(key);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    clearSelectedItem(state) {
      state.selectedItem = null;
      state.errorItem = null;
      state.loadingItem = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivityByKey.pending, (state) => {
        state.loadingItem = true;
        state.errorItem = null;
      })
      .addCase(fetchActivityByKey.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchActivityByKey.rejected, (state, action) => {
        state.loadingItem = false;
        state.errorItem = action.payload;
      });
  },
});

export const { clearSelectedItem } = itemsSlice.actions;
export default itemsSlice.reducer;
