import React, { useState } from "react";
import { selectUserById, UserType } from "../../../store/features/usersSlice";
import { useAppSelector } from "../../../store/index";

const PostAuth: React.FC<{ userId?: string }> = ({ userId }) => {
	const [auth, setAuth] = useState<UserType>({} as UserType);
	if (userId) {
		const res = useAppSelector((state) => selectUserById(state, userId));
		if (res) setAuth(res);
	}

	return <div>Auther: "{auth ? auth!.name : "Unknown Auther"}"</div>;
};

export default PostAuth;
