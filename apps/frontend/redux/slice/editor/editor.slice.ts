import { createSlice } from "@reduxjs/toolkit";

export const editorSlice = createSlice({
  initialState: {
    language: "typescript",
    fontSize: 14,
    theme: "vs-dark",
  },
  name: "EditorLanguage",
  reducers: {
    // updateEditorSettings: (state, action) => {
    //   return (state = action.payload);
    // },
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },

    chnagefontSize: (state, action) => {
      state.fontSize = action.payload;
    },

    chnageTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const {
  // updateEditorSettings,
  changeLanguage,
  chnagefontSize,
  chnageTheme,
} = editorSlice.actions;
export default editorSlice.reducer;
