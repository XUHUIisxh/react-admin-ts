import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../store/index";
import { useNavigate } from "react-router-dom";
import PostAuth from "./components/PostAuth";
import { postType } from "../../store/features/postSlice";

const SinglePostPage = () => {
	const { postId } = useParams();
	const navigate = useNavigate();

	const post = useSelector((state: RootState) => state.posts.find((post) => postId === post.id));

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
				<h2>{post?.title}</h2>
				<p className='post-content'>{post?.content}</p>
				<PostAuth userId={(post as postType)?.user} />
				<button type='button' onClick={() => navigate(`/EditPostForm/${postId}`)}>
					Edit Post
				</button>
			</article>
		</section>
	);
};

export default SinglePostPage;
