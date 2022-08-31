import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  modalType: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    SET_MODAL: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { SET_MODAL } = modalSlice.actions;
export default modalSlice.reducer;
