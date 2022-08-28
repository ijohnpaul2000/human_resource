import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
  isSubMenuOpen: false,
  linkActive: "Dashboard",
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    TOGGLE_SIDEBAR: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    TOGGLE_SUBMENU: (state) => {
      state.isSubMenuOpen = !state.isSubMenuOpen;
    },
    SET_LINK_ACTIVE: (state, action) => {
      state.linkActive = action.payload;
    },
  },
});

export const { TOGGLE_SIDEBAR, TOGGLE_SUBMENU, SET_LINK_ACTIVE } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
