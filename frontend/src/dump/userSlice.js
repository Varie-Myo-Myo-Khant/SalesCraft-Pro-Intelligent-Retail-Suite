// In slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../Services/UserService';

export const fetchUserBoard = createAsyncThunk(
  'user/fetchUserBoard',
  async () => {
    const response = await UserService.getUserBoard();
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    content: '',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
      })
      .addCase(fetchUserBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user board data';
      });
  }
});

export default userSlice.reducer;
