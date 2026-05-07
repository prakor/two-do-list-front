// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '@services/authService';

export const registerUser = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    console.log('- data : ', data);
    const response = await authService.register(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Registration failed');
  }
});

const initialState = {
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        console.log('registerUser.pending');
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log('registerUser.fulfilled');
        console.log('action : ', action);
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log('registerUser.rejected');
        console.log('action : ', action)
        state.isLoading = false;
        state.error = action.payload;
      })
  }
});

export const { login } = authSlice.actions;
export default authSlice.reducer;