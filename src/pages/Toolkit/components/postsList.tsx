import { useSelector } from "react-redux";
import { RootState } from "../../../store/index";
import { useNavigate } from "react-router";
import { Post } from "../../../store/features/postSlice";

const PostsList = () => {
	const navigate = useNavigate();

	const posts = useSelector((state: RootState) => state.posts);

	const linkTo = (post: RootState["posts"][number]) => {
		navigate(`/SinglePostPage/${post?.id}`);
	};

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
