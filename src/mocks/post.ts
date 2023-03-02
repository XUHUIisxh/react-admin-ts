import { factory, primaryKey, manyOf, oneOf } from "@mswjs/data";
import { rest } from "msw";
import { nanoid } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";

faker.locale = "zh_CN";

const NUM_USERS = 3;
const POSTS_PER_USER = 3;
const RECENT_NOTIFICATIONS_DAYS = 7;

// Add an extra delay to all endpoints, so loading spinners show up.
const ARTIFICIAL_DELAY_MS = 500;

type DBUserType = ReturnType<(typeof db)["user"]["create"]>;
type DBPostType = ReturnType<(typeof db)["post"]["create"]>;

export const db = factory({
	user: {
		id: primaryKey(nanoid),
		firstName: String,
		lastName: String,
		name: String,
		userName: String,
		posts: manyOf("post"),
	},
	post: {
		id: primaryKey(nanoid),
		title: String,
		data: String,
		content: String,
		reactions: oneOf("reaction"),
		comments: manyOf("comment"),
		user: oneOf("user"),
	},
	comment: {
		id: primaryKey(String),
		data: String,
		text: String,
		post: oneOf("post"),
	},
	reaction: {
		id: primaryKey(nanoid),
		thumbsUp: Number,
		hooray: Number,
		heart: Number,
		rocket: Number,
		eyes: Number,
		post: oneOf("post"),
	},
});

const createUserData = () => {
	const firstName = faker.name.firstName();
	const lastName = faker.name.lastName();
	return {
		firstName,
		lastName,
		name: `${firstName}${lastName}`,
		username: faker.internet.userName(),
	};
};

const createPostData = (user: DBUserType) => {
	return {
		title: faker.lorem.words(),
		date: faker.date.recent(RECENT_NOTIFICATIONS_DAYS).toISOString(),
		user,
		content: faker.lorem.paragraphs(),
		reactions: db.reaction.create(),
	};
};

for (let i = 0; i < NUM_USERS; i++) {
	const auther = db.user.create(createUserData());
	for (let j = 0; j < POSTS_PER_USER; j++) {
		const newPost = createPostData(auther);
		db.post.create(newPost);
	}
}

const serializePost = (post: DBPostType) => ({
	...post,
	user: post.user!.id,
});

export const handlers = [
	rest.get("/fakeApi/posts", (req, res, ctx) => {
		const posts = db.post.getAll().map(serializePost);
		return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(posts));
	}),
	rest.get("/fakeApi/users", (req, res, ctx) => {
		const users = db.user.getAll();
		return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(users));
	}),
];
