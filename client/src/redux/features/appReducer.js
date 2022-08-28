import { createSlice } from "@reduxjs/toolkit";
import { notifyToast } from "../../helpers/notifyToast";

const initialState = {
  isAppLoading: false,
  appMessage: null,
  appMessageSeverity: null,
  appAuthState: "Login",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    SET_APP_LOADING: (state, action) => {
      state.isAppLoading = action.payload;
    },
    SET_APP_MESSAGE: (state, action) => {
      state.appMessage = action.payload;
    },
    SET_APP_AUTH_STATE: (state, action) => {
      state.appAuthState = action.payload;
    },
    RESET_STATE: (state) => {
      state.isAppLoading = false;
      state.appMessage = null;
      state.appMessageSeverity = null;
      state.appAuthState = "Login";
    },
  },
});

export const {
  SET_APP_LOADING,
  SET_APP_MESSAGE,
  RESET_STATE,
  SET_APP_AUTH_STATE,
} = appSlice.actions;
export default appSlice.reducer;
