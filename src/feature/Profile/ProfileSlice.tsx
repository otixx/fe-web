import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
const initialState = {
  data: [],
  status: "idle",
  error: null,
};
export const fetchProfile = createAsyncThunk(``, async () => {
  const getItem: any = Cookies.get("token");
  const token = JSON.parse(getItem);
  try {
    const response = axios.get(`${import.meta.env.VITE_URL}profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return (await response).data;
  } catch (error) {
    throw error;
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectProfile = (state: any) => state.profile;
export default profileSlice.reducer;
