import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  applicantInfo: [],
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
  },
});

export const { IS_LOADING, APPLICATION_INFO } = appointmentSlice.actions;
export default appointmentSlice.reducer;
