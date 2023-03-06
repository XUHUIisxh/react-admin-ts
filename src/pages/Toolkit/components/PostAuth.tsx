import React from "react";
import { useAppSelector } from "../../../store/index";

const PostAuth: React.FC<{ userId?: string }> = ({ userId }) => {
	const auth = useAppSelector((state) => state.users.users.find((user) => user.id === userId));
	return <div>Auther: "{auth ? auth.name : "Unknown Auther"}"</div>;
};

export default PostAuth;
