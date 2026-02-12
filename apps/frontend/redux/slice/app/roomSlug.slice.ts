import { createSlice } from "@reduxjs/toolkit";

export const roomSlugSlice = createSlice({
  initialState: "",
  name: "RoomSlug",
  reducers: {
    setRoomSlug: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setRoomSlug } = roomSlugSlice.actions;
export default roomSlugSlice.reducer;
