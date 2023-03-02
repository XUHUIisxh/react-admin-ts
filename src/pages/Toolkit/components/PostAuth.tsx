import React from "react";
import { useAppSelector } from "../../../store/index";

const PostAuth: React.FC<{ userId?: string }> = ({ userId }) => {
	const auth = useAppSelector((state) => state.users.find((user) => user.id === userId));
	return <div>{auth ? <div>{auth.name}</div> : "Unknown Auther"}</div>;
};

export default PostAuth;
