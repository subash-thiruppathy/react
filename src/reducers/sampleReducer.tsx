import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../core/interfaces/homeInterface';
import axios from 'axios';
import { ApiList } from '../core/variables/ApiList';
import { apiService } from '../services/service';

interface UserState {
  name: string | null;
  isLoggedIn: boolean;
  data: [];
}

const initialState: UserState = {
  name: null,
  isLoggedIn: false,
  data: []
};

export const getUserDetail = createAsyncThunk(
  'user/getUserDetail',
  async () => {
    console.log("Api",ApiList.login)
    try {
      let response = apiService.get(ApiList.login);
    } catch (error) {
      throw Error('Failed to fetch user details'); // Throw an error in case of failure
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      console.log('Login clicked', state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetail.pending, (state) => {
        console.log('In pending', state);
      })
      .addCase(getUserDetail.fulfilled, (state, action) => {
        const userData = action.payload;
        console.log("Action", action.payload);
        // state.data = userData; // Update state with the fetched data
      })
      .addCase(getUserDetail.rejected, (state, action) => {
        console.error('Error fetching user details:', action.error.message);
      });
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
