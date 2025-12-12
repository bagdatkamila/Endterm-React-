import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupUser as apiSignup, loginUser as apiLogin, logoutUser as apiLogout, subscribeToAuth } from "../../api/authService";
import { loadFavorites } from "../favorites/favoritesSlice";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

// =============== REGISTER ===============
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await apiSignup(email, password);
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// =============== LOGIN ===============
export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await apiLogin(email, password);
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// =============== LOGOUT ===============
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async () => {
    await apiLogout();
    return null;
  }
);

// =============== SLICE ===============
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
        ? {
            uid: action.payload.uid,
            email: action.payload.email,
            displayName: action.payload.displayName,
            photoURL: action.payload.photoURL,
          }
        : null;
      state.loading = false;
      state.error = null;
    },
    clearUser(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

// =============== INIT AUTH LISTENER ===============
export const initAuthListener = () => (dispatch) => {
  subscribeToAuth((user) => {
    if (user) {
      const payload = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };

      dispatch(setUser(payload));
      dispatch(loadFavorites({ uid: user.uid }));

    } else {
      dispatch(clearUser());
      dispatch(loadFavorites({ uid: null }));
    }
  });
};
