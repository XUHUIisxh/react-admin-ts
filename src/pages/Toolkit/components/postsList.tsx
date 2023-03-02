import { useEffect } from "react";
import { useNavigate } from "react-router";
import { RootState, useAppDispatch, useAppSelector } from "../../../store/index";
import { fetchPosts, Post, selectAllPosts } from "../../../store/features/postsSlice";

const PostsList = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const posts = useAppSelector(selectAllPosts);
	const postsStatus = useAppSelector((state) => state.posts.status);

	const linkTo = (post: RootState["posts"]["posts"][number]) => {
		navigate(`/SinglePostPage/${post.id}`);
	};

	useEffect(() => {
		if (postsStatus === "idle") {
			dispatch(fetchPosts());
		}
	}, [dispatch, postsStatus]);

	/** 排序 */
	const orderPosts = posts.slice().sort((a: Post, b: Post) => {
		return b.date - a.date;
	});

	const renderPosts = orderPosts.map((post) => (
		<article className='post-excerpt' key={post.id} onClick={() => linkTo(post)}>
			<h3>{post.title}</h3>
			<p className='post-content'>{post.content.substring(0, 100)}</p>
		</article>
	));

	return (
		<div className='posts-list'>
			<h2>Posts</h2>
			{renderPosts}
		</div>
	);
};

export default PostsList;
