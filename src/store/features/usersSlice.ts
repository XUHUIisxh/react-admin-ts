import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { users } from "../../api/fakeApi";
import { RootState } from "../index";

interface UserType {
	id: string;
	name: string;
}

const initialState: UserType[] = [];

export const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			const data = action.payload as unknown;
			state = state.concat(...(data as UserType[]));
		});
	},
});

export default userSlice.reducer;

export const fetchUser = createAsyncThunk("users/fetchUsers", async () => {
	const data = await users();
	return data;
});

export const selectAllUser = (state: RootState) => state.users;
