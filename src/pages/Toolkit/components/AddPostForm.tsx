import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { postAdded } from "../../../store/features/postSlice";

const AddPostForm = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const dispatch = useDispatch();

	const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
	const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

	const onSavePostClick = () => {
		if (title && content) {
			dispatch(
				postAdded({
					id: nanoid(),
					title,
					content,
				})
			);
			setTitle("");
			setContent("");
		}
	};

	return (
		<section>
			<h2>添加文章</h2>
			<form>
				<label htmlFor='postTitle'>文章标题：</label>
				<input type='text' id='postTitle' name='postTitle' value={title} onChange={onTitleChange} />
				<label htmlFor=''>文章内容：</label>
				<textarea name='postContent' id='postContent' value={content} onChange={onContentChange}></textarea>
				<button type='button' onClick={onSavePostClick}>
					保存文章
				</button>
			</form>
		</section>
	);
};

export default AddPostForm;
