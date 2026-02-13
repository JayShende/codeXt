import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  initialState: {},
  name: "AuthSession",
  reducers: {
    setAuthSession: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const {setAuthSession} = sessionSlice.actions;
export default sessionSlice.reducer;