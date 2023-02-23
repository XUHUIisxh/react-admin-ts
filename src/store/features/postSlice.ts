import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";

const initialState = [
	{
		id: 1,
		title: "First Post!",
		content: "Hello",
	},
	{
		id: 2,
		title: "Second Post!",
		content: "More Next",
	},
];

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		postAdded: (state, { payload }) => {
			state.push(payload);
		},
		postUpdated: (state, { payload }) => {
			const { id, title, content } = payload;
			const existingPost = state.find((post) => post.id === id);
			if (existingPost) {
				existingPost.title = title;
				existingPost.content = content;
			}
		},
	},
});

export const { postAdded, postUpdated } = postSlice.actions;

export default postSlice.reducer;
