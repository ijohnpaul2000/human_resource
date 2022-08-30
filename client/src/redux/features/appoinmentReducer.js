import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  applicantInfo: [],
  isModalOpened: false,
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    IS_LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
    APPLICATION_INFO: (state, action) => {
      state.applicantInfo = action.payload;
    },
    IS_MODAL_OPENED: (state, action) => {
      state.isModalOpened = action.payload;
    },
  },
});

export const { IS_LOADING, APPLICATION_INFO, IS_MODAL_OPENED } =
  appointmentSlice.actions;
export default appointmentSlice.reducer;
