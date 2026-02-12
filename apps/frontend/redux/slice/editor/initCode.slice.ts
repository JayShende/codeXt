import { createSlice } from "@reduxjs/toolkit";

export const initialCodeSlice = createSlice({
  initialState: "Welcome To CodeXt App",
  name: "InitialCode",
  reducers: {
    setInitialCode: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setInitialCode } = initialCodeSlice.actions;
export default initialCodeSlice.reducer;
