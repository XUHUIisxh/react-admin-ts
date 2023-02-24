import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = [
	{
		id: "1",
		title: "First Post!",
		content: "Hello",
		date: dayjs().subtract(10, "m").valueOf(),
		user: "1",
		// reactions: {
		// 	thumbsUp: 0,
		// 	hooray: 0,
		// 	heart: 0,
		// 	rocket: 0,
		// 	eyes: 0,
		// },
	},
	{
		id: "2",
		title: "Second Post!",
		content: "More Next",
		date: dayjs().subtract(5, "m").valueOf(),
		user: "2",
		// reactions: {
		// 	thumbsUp: 0,
		// 	hooray: 0,
		// 	heart: 0,
		// 	rocket: 0,
		// 	eyes: 0,
		// },
	},
];

export type postType = (typeof initialState)[number];

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		postAdded: {
			reducer(state, action: PayloadAction<postType>) {
				state.push(action.payload);
			},
			prepare: (title, content, userId) => {
				return {
					payload: {
						id: nanoid(),
						date: dayjs().valueOf(),
						title,
						content,
						user: userId,
					},
				};
			},
		},
		postUpdated: (state, { payload }) => {
			const { id, title, content } = payload;
			const existingPost = state.find((post) => post.id === id);
			if (existingPost) {
				existingPost.title = title;
				existingPost.content = content;
			}
		},
		// reactionAdded(state, action) {
		// 	const { postId, reaction } = action.payload;
		// 	const existingPost = state.find((post) => post.id === postId);
		// 	if (existingPost) {
		// 		existingPost.reactions[reaction]++;
		// 	}
		// },
	},
});

export const { postAdded, postUpdated } = postSlice.actions;

export default postSlice.reducer;
