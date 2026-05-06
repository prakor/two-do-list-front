// src/store/slices/layoutOptionsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	typeLayout: "board"
};

const layoutOptionsSlice = createSlice({
	name: 'layoutOptions',
	initialState,
	reducers: {
		setTypeLayout: (state, action) => {
			state.typeLayout = action.payload;
		}
	},
});

export const { setTypeLayout } = layoutOptionsSlice.actions;
export default layoutOptionsSlice.reducer;