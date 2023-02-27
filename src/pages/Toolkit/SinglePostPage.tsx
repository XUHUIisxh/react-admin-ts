import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../store/index";
import { useNavigate } from "react-router-dom";
import PostAuth from "./components/PostAuth";
import { Post } from "../../store/features/postSlice";
import ReactionButtons from "./components/ReactionButtons";

const SinglePostPage = () => {
	const { postId } = useParams();
	const navigate = useNavigate();

	if (!postId) {
		return (
			<section>
				<h2>页面未找到！</h2>
			</section>
		);
	}

	const post = useSelector((state: RootState) => state.posts.find((post) => postId === post.id)) as Post;

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
