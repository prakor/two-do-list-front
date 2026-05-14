import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import layoutOptionsReducer from "./slices/layoutOptionsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    layoutOptions: layoutOptionsReducer,
  },
});

export default store;
