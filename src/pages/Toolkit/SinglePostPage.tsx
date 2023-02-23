import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../store/index";

const SinglePostPage = () => {
	const { postId } = useParams();

	const post = useSelector((state: RootState) => state.posts.find((post) => Number(postId) === post.id));

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
			</article>
		</section>
	);
};

export default SinglePostPage;
