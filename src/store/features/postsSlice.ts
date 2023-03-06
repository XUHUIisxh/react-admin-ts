import { createSlice, nanoid, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { posts } from "../../api/fakeApi";
import { RootState } from "../index";

export interface Post {
	id: string;
	title: string;
	content: string;
	date: string;
	user: string;
	reactions?: {
		thumbsUp: number;
		hooray: number;
		heart: number;
		rocket: number;
		eyes: number;
	};
}

interface InitialType {
	posts: any[];
	status: string;
	error: string | undefined;
}

export type EditPostType = {
	postId: string;
	reaction: keyof Post["reactions"];
};

const initialState: InitialType = {
	posts: [],
	status: "idle",
	error: "",
};

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		postAdded: {
			reducer(state, action: PayloadAction<Post>) {
				state.posts.push(action.payload);
			},
			prepare: (title, content, userId) => {
				return {
					payload: {
						id: nanoid(),
						date: dayjs().toISOString(),
						title,
						content,
						user: userId,
					},
				};
			},
		},
		postUpdated: (state, { payload }) => {
			const { id, title, content } = payload;
			const existingPost = state.posts.find((post) => post.id === id);
			if (existingPost) {
				existingPost.title = title;
				existingPost.content = content;
				existingPost.date = dayjs().toISOString();
			}
		},
		reactionAdded(state, action) {
			const { postId, reaction }: EditPostType = action.payload;
			const existingPost = state.posts.find((post) => post.id === postId);
			if (existingPost !== undefined && existingPost.reactions !== undefined) {
				existingPost.reactions[reaction]++;
			}
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state, action) => {
				state.status = "padding";
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = "successed";
				state.posts = state.posts.concat(action.payload);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { postAdded, postUpdated, reactionAdded } = postSlice.actions;

export default postSlice.reducer;

export const selectAllPosts = (state: RootState) => state.posts.posts;

export const selectPostById = (state: RootState, postId: string) =>
	state.posts.posts.find((post) => post.id === postId);

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	const data = await posts();
	return data;
});
