import { useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/index";
import { postUpdated } from "../../store/features/postSlice";
import { useNavigate } from "react-router-dom";

const EditPostForm = () => {
	const { postId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const post = useSelector((state: RootState) => state.posts.find((post) => post.id === postId));

	const [title, setTitle] = useState(post?.title);
	const [content, setContent] = useState(post?.content);

	const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
	const onContentChange = (e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value);

	const onSavePostClick = () => {
		if (title && content) {
			dispatch(postUpdated({ id: Number(postId), title, content }));
			navigate(`/SinglePostPage/${postId}`);
		}
	};

	return (
		<section>
			<h2>编辑文章</h2>
			<form>
				<label htmlFor='postTitle'>文章标题</label>
				<input type='text' id='postTitle' name='postTitle' value={title} onChange={onTitleChange} />
				<label htmlFor='postContent'>文章内容</label>
				<input type='text' id='postContent' name='postContent' value={content} onChange={onContentChange} />
			</form>
			<button type='button' onClick={onSavePostClick}>
				保存文章
			</button>
		</section>
	);
};

export default EditPostForm;
