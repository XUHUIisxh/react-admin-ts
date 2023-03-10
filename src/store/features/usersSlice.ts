import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { users } from "../../api/fakeApi";
import { RootState } from "../index";

export interface UserType {
	id: string;
	name: string;
	userName: string;
	avatarUrl: string;
	imageUrl: string;
}

const usersAdapter = createEntityAdapter<UserType>({
	selectId: (user) => user.id,
});

const initialState = usersAdapter.getInitialState();

export const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			usersAdapter.upsertMany(state, action.payload);
		});
	},
});

export default userSlice.reducer;

export const {
	selectAll: selectAllUser,
	selectById: selectUserById,
	selectIds,
} = usersAdapter.getSelectors<RootState>((state) => state.users);

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
	const data = await users();
	return data as unknown as UserType[];
});
