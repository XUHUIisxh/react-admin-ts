import service from "../service/index";

export const posts = () => {
	return service({ url: "/fakeApi/posts", method: "get" });
};

export const users = () => {
	return service({ url: "/fakeApi/users", method: "get" });
};
