import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/index";

const PostAuth: React.FC<{ userId?: string }> = ({ userId }) => {
	const auth = useSelector((state: RootState) => state.users.find((user) => user.id === userId));
	return <div>{auth ? <div>{auth.name}</div> : "Unknown Auther"}</div>;
};

export default PostAuth;
