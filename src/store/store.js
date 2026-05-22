import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import layoutOptionsReducer from "./slices/layoutOptionsSlice";
import projectReducer from "./slices/projectSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    layoutOptions: layoutOptionsReducer,
    project: projectReducer,
  },
});

export default store;
