import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import layoutOptionsReducer from './slices/layoutOptionsSlice';
import counterSlice from './slices/counterSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        layoutOptions: layoutOptionsReducer,
        counter: counterSlice,
    },
});

export default store;