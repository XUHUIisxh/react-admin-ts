import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { users } from "../../api/fakeApi";
import { RootState } from "../index";

interface UserType {
	id: string;
	name: string;
}

interface UserInitialType {
	users: UserType[];
}

const initialState: UserInitialType = {
	users: [],
};

export const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.users = state.users.concat(...(action.payload as unknown as UserType[]));
		});
	},
});

export default userSlice.reducer;

export const selectAllUser = (state: RootState) => state.users.users;

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
	const data = await users();
	return data;
});
