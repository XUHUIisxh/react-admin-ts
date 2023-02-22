import { createSlice } from "@reduxjs/toolkit";

export interface UserSlice {
	id: string;
	name: string;
	auth: string;
}

const initialState: UserSlice = {
	id: "1",
	name: "kevin",
	auth: "admin",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setAuth: (state, { payload }) => {
			state.auth = payload.auth;
		},
	},
});

export const { setAuth } = userSlice.actions;

export default userSlice.reducer;
