// src/store/slices/authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "@services/authService";
import {
  clearStoredAuth,
  getStoredAuth,
  setStoredAuth,
} from "@services/authStorage";

const normalizeAuthPayload = (payload) => {
  const source = payload?.data ?? payload;
  return {
    accessToken: source?.accessToken ?? source?.tokens?.accessToken ?? null,
    refreshToken: source?.refreshToken ?? source?.tokens?.refreshToken ?? null,
    user: source?.user ?? null,
  };
};

const buildErrorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      return await authService.register(data);
    } catch (error) {
      return rejectWithValue(buildErrorMessage(error, "Registration failed"));
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      return await authService.login(data);
    } catch (error) {
      return rejectWithValue(buildErrorMessage(error, "Login failed"));
    }
  }
);

const storedAuth = getStoredAuth();

const initialState = {
  user: storedAuth.user,
  accessToken: storedAuth.accessToken,
  refreshToken: storedAuth.refreshToken,
  // isAuthenticated: true,
  isAuthenticated: Boolean(storedAuth.accessToken),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      clearStoredAuth();
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { accessToken, refreshToken, user } = normalizeAuthPayload(
          action.payload
        );

        state.isLoading = false;
        state.error = null;
        if (accessToken) {
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;
          state.user = user;
          state.isAuthenticated = true;
          setStoredAuth({ accessToken, refreshToken, user });
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Registration failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { accessToken, refreshToken, user } = normalizeAuthPayload(
          action.payload
        );

        state.isLoading = false;
        state.error = null;
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.isAuthenticated = Boolean(accessToken);
        setStoredAuth({ accessToken, refreshToken, user });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { clearAuthError, logout } = authSlice.actions;
export default authSlice.reducer;
