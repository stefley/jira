import { projectListSlice } from "./../screens/project-list/project-list.slice";
import { authSlice } from "./auth.slice";
import { configureStore } from "@reduxjs/toolkit";

export const rootReducer = {
  projectList: projectListSlice.reducer,
  auth: authSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
