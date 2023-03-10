import { factory, primaryKey, manyOf, oneOf } from "@mswjs/data";
import { rest } from "msw";
import { Dictionary, nanoid } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";
import { Client, Server as MockSocketServer } from "mock-socket";
import { sentence } from "txtgen";
import seedrandom from "seedrandom";
import dayjs from "dayjs";
import { FactoryAPI } from "@mswjs/data/lib/glossary";
import { Database } from "@mswjs/data/lib/db/Database";

faker.locale = "zh_CN";

const NUM_USERS = 3;
const POSTS_PER_USER = 3;
const RECENT_NOTIFICATIONS_DAYS = 7;

// Add an extra delay to all endpoints, so loading spinners show up.
const ARTIFICIAL_DELAY_MS = 500;

type DBType = typeof db;
type DBUserType = ReturnType<(typeof db)["user"]["create"]>;
type DBPostType = ReturnType<(typeof db)["post"]["create"]>;

const rng = seedrandom();

function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(rng() * (max - min + 1)) + min;
}

export const db = factory({
	user: {
		id: primaryKey(nanoid),
		firstName: String,
		lastName: String,
		name: String,
		userName: String,
		avatarUrl: String,
		imageUrl: String,
		posts: manyOf("post"),
	},
	post: {
		id: primaryKey(nanoid),
		title: String,
		date: String,
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
	const avatarUrl = faker.image.avatar();
	const imageUrl = faker.image.image();
	return {
		firstName,
		lastName,
		avatarUrl,
		imageUrl,
		name: `${firstName}${lastName}`,
		userName: faker.internet.userName(),
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
	rest.get("/fakeApi/notifications", (req, res, ctx) => {
		const numNotifications = getRandomInt(1, 5);

		let notifications = generateRandomNotifications(undefined, numNotifications, db);

		return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(notifications));
	}),
];

/** Mock socket setup */
const socketServer = new MockSocketServer("ws://localhost");
console.log("🚀 ~ file: post.ts:110 ~ socketServer:", socketServer);

let currentSocket: Client;

const randomFromArray = (array: DBUserType[] | string[]) => {
	const index = getRandomInt(0, array.length - 1);
	return array[index];
};

const sendMessage = (socket: Client, obj: {}) => {
	socket.send(JSON.stringify(obj));
};

const sendRandomNotifications = (socket: Client, since: string) => {
	const numNotifications = getRandomInt(1, 5);

	const notifications = generateRandomNotifications(since, numNotifications, db);

	sendMessage(socket, { type: "notifications", payload: notifications });
};

export const forceGenerateNotifications = (since: string) => {
	sendRandomNotifications(currentSocket, since);
};

socketServer.on("connection", (socket) => {
	currentSocket = socket;
	console.log("🚀 ~ file: post.ts:144 ~ socketServer.on ~ currentSocket:", currentSocket);

	socket.on("message", (data) => {
		const message = JSON.parse(data as string);

		switch (message.type) {
			case "notifications":
				const since = message.payload;
				break;

			default:
				break;
		}
	});
});

const notificationTemplates = ["poked you", "says hi!", `is glad we're friends`, "sent you a gift"];

function generateRandomNotifications(since: string | undefined, numNotifications: number, db: DBType) {
	let pastDate: string;

	if (since) {
		pastDate = dayjs(since).toISOString();
	} else {
		pastDate = dayjs().toISOString();
	}

	const notifications = [...Array(numNotifications)].map(() => {
		const user = randomFromArray(db.user.getAll());
		const template = randomFromArray(notificationTemplates);
		return {
			id: nanoid(),
			date: dayjs(since).toISOString(),
			message: template,
			user: user,
			read: false,
		};
	});

	return notifications;
}
