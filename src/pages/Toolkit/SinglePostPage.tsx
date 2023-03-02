import React from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../../store/index";
import { useNavigate } from "react-router-dom";
import PostAuth from "./components/PostAuth";
import { selectPostById } from "../../store/features/postsSlice";
import ReactionButtons from "./components/ReactionButtons";

const SinglePostPage = () => {
	const { postId } = useParams();
	const navigate = useNavigate();

	const post = useAppSelector((state) => selectPostById(state, postId!))!;

	if (!postId) {
		return (
			<section>
				<h2>页面未找到！</h2>
			</section>
		);
	}

	return (
		<section>
			<article className='post'>
				<h2>{post.title}</h2>
				<p className='post-content'>{post.content}</p>
				<PostAuth userId={post.user} />
				<ReactionButtons post={post} />
				<button type='button' onClick={() => navigate(`/EditPostForm/${postId}`)}>
					Edit Post
				</button>
			</article>
		</section>
	);
};

export default SinglePostPage;
