import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {},
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    LOGOUT: (state) => {
      state.user = {};
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    RESET_STATE: (state) => {
      state.user = {};
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
});

export const { LOGIN, LOGOUT, RESET_STATE } = authSlice.actions;
export default authSlice.reducer;
