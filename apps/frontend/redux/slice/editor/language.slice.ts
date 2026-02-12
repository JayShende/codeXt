import { createSlice } from "@reduxjs/toolkit";

export const languageSlice = createSlice({
  initialState: "typescript",
  name: "EditorLanguage",
  reducers: {
    changeLanguage: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
