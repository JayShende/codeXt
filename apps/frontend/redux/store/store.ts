import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "../slice/editor/language.slice";
import roomSlugSlice from "../slice/app/roomSlug.slice";
import initialCodeSlice from "../slice/editor/initCode.slice";
import sideBarToggleSlice from "../slice/sidebar/sideBarToggle.slice";
import setAuthSession from "../slice/auth/session.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      // Editor Slices
      language: languageSlice,
      initcode: initialCodeSlice,
      roomSlug: roomSlugSlice,
      sidebarToggle: sideBarToggleSlice,
      authSession: setAuthSession,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
