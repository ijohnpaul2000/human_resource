import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
  isSubMenuOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleSubMenu: (state) => {
      state.isSubMenuOpen = !state.isSubMenuOpen;
    },
  },
});

export const { toggleSidebar, toggleSubMenu } = sidebarSlice.actions;
export default sidebarSlice.reducer;
