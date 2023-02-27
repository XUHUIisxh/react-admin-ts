import React from "react";
import { useDispatch } from "react-redux";
import { Post, reactionAdded } from "../../../store/features/postSlice";
const ReactionEmoji = {
	thumbsUp: "👍",
	hooray: "🎉",
	heart: "❤️",
	rocket: "🚀",
	eyes: "👀",
};

const ReactionButtons: React.FC<{ post: Post }> = ({ post }) => {
	const dispatch = useDispatch();
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
