import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postAdded } from "../../../store/features/postSlice";
import { RootState } from "../../../store/index";

const AddPostForm = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [userId, setUserId] = useState("");

	const dispatch = useDispatch();

	const users = useSelector((state: RootState) => state.users);

	const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
	const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
	const onAuthChange = (e: React.ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value);

	const onSavePostClick = () => {
		if (title && content) {
			dispatch(postAdded(title, content, userId));
			setTitle("");
			setContent("");
			setUserId("");
		}
	};

	const canSave = Boolean(title) && Boolean(content);

	const userOptions = users.map((user) => {
		return (
			<option value={user.id} key={user.id}>
				{user.name}
			</option>
		);
	});

	return (
		<section>
			<h2>添加文章</h2>
			<form>
				<label htmlFor='postTitle'>文章标题：</label>
				<input type='text' id='postTitle' name='postTitle' value={title} onChange={onTitleChange} />
				<label htmlFor='postAuther'>作者</label>
				<select name='postAuther' id='postAuther' value={userId} onChange={onAuthChange}>
					<option value=''></option>
					{userOptions}
				</select>
				<label htmlFor=''>文章内容：</label>
				<textarea name='postContent' id='postContent' value={content} onChange={onContentChange}></textarea>
				<button type='button' onClick={onSavePostClick} disabled={!canSave}>
					保存文章
				</button>
			</form>
		</section>
	);
};

export default AddPostForm;
