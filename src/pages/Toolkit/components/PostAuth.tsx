import React, { useEffect, useState } from "react";
import { selectUserById, UserType } from "../../../store/features/usersSlice";
import { useAppSelector } from "../../../store/index";

const PostAuth: React.FC<{ userId: string }> = ({ userId }) => {
	const auth = useAppSelector((state) => selectUserById(state, userId));

	return <div>Auther: "{auth ? auth!.name : "Unknown Auther"}"</div>;
};

export default PostAuth;
