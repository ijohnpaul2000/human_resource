import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
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
      sessionStorage.setItem("user_token", action.payload.token);
    },
    LOGOUT: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      sessionStorage.removeItem("user_token");
    },
    RESET_STATE: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      sessionStorage.removeItem("user_token");
    },
  },
});

export const { LOGIN, LOGOUT, RESET_STATE } = authSlice.actions;
export default authSlice.reducer;
