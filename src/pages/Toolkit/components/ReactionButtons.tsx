import React from "react";
import { Post, reactionAdded } from "../../../store/features/postsSlice";
import { useAppDispatch } from "../../../store/index";
const ReactionEmoji = {
	thumbsUp: "👍",
	hooray: "🎉",
	heart: "❤️",
	rocket: "🚀",
	eyes: "👀",
};

const ReactionButtons: React.FC<{ post: Post }> = ({ post }) => {
	const dispatch = useAppDispatch();
	const reactionButtons = Object.entries(ReactionEmoji).map(([name, emoji]) => {
		return (
			<button
				key={name}
				type='button'
				onClick={() => {
					dispatch(reactionAdded({ postId: post.id, reaction: name }));
				}}
			>
				{emoji}
				{(post.reactions as keyof Post["reactions"])[name]}
			</button>
		);
	});

	return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
