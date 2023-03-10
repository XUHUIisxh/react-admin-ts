import {
	createSlice,
	nanoid,
	PayloadAction,
	createAsyncThunk,
	createSelector,
	createEntityAdapter,
} from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { posts } from "../../api/fakeApi";
import store, { RootState } from "../index";

export interface ReactionsType {
	thumbsUp: number;
	hooray: number;
	heart: number;
	rocket: number;
	eyes: number;
}

export interface Post {
	id: string;
	title: string;
	content: string;
	date: string;
	user: string;
	reactions?: {
		[K in keyof ReactionsType]: ReactionsType[K];
	};
}

interface InitialType {
	status: string;
	error: string | undefined;
}

export type EditPostType = {
	postId: string;
	reaction: keyof ReactionsType;
};

const postsAdapter = createEntityAdapter<Post>({
	selectId: (post) => post.id,
	sortComparer: (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf(),
});

const initialState = postsAdapter.getInitialState<InitialType>({
	status: "idle",
	error: "",
});

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		postAdded: postsAdapter.addOne,
		postUpdated: (state, { payload }) => {
			const { id, title, content } = payload;
			const existingPost = state.entities[id];
			if (existingPost) {
				existingPost.title = title;
				existingPost.content = content;
				existingPost.date = dayjs().toISOString();
			}
		},
		reactionAdded(state, action: PayloadAction<EditPostType>) {
			const { postId, reaction } = action.payload;
			const existingPost = state.entities[postId];
			if (existingPost !== undefined && existingPost.reactions !== undefined) {
				existingPost.reactions[reaction]++;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.status = "padding";
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = "successed";
				postsAdapter.upsertMany(state, action.payload);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { postAdded, postUpdated, reactionAdded } = postSlice.actions;

export default postSlice.reducer;

export const {
	selectAll: selectAllPosts,
	selectById: selectPostById,
	selectIds: selectPostIds,
} = postsAdapter.getSelectors<RootState>((state) => state.posts);

// export const selectAllPosts = (state: RootState) => postsAdapter.getSelectors().selectEntities(state.posts);
// const postsSelect = postsAdapter.getSelectors<RootState>((state) => state.posts);

// export const selectAllPosts = postsSelect.selectAll(store.getState());

// export const selectPostById = (state: RootState, postId: string) =>
// 	postsAdapter.getSelectors().selectById(state.posts, postId);

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	const data = await posts();
	return data as unknown as Post[];
});
