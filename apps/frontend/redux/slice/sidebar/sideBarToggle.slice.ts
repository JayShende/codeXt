import { createSlice } from "@reduxjs/toolkit";

export const sideBarToggleSlice = createSlice({
  initialState: true,
  name: "SidebarToggle",
  reducers: {
    toggleSidebar: (state) => {
      return (state = !state);
    },
  },
});

export const { toggleSidebar } = sideBarToggleSlice.actions;
export default sideBarToggleSlice.reducer;
