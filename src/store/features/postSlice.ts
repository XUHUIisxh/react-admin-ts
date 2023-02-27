import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
export interface Post {
	id: string;
	title: string;
	content: string;
	date: number;
	user: string;
	reactions?: {
		thumbsUp: number;
		hooray: number;
		heart: number;
		rocket: number;
		eyes: number;
	};
}

export type EditPostType = {
	postId: string;
	reaction: keyof Post["reactions"];
};

const initialState: Post[] = [
	{
		id: "1",
		title: "First Post!",
		content: "Hello",
		date: dayjs().subtract(10, "m").valueOf(),
		user: "1",
		reactions: {
			thumbsUp: 0,
			hooray: 0,
			heart: 0,
			rocket: 0,
			eyes: 0,
		},
	},
	{
		id: "2",
		title: "Second Post!",
		content: "More Next",
		date: dayjs().subtract(5, "m").valueOf(),
		user: "2",
		reactions: {
			thumbsUp: 0,
			hooray: 0,
			heart: 0,
			rocket: 0,
			eyes: 0,
		},
	},
];

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		postAdded: {
			reducer(state, action: PayloadAction<Post>) {
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
		reactionAdded(state, action) {
			const { postId, reaction }: EditPostType = action.payload;
			const existingPost = state.find((post) => post.id === postId);
			if (existingPost !== undefined && existingPost.reactions !== undefined) {
				existingPost.reactions[reaction]++;
			}
		},
	},
});

export const { postAdded, postUpdated, reactionAdded } = postSlice.actions;

export default postSlice.reducer;
