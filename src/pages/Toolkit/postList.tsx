import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { selectAllPosts, fetchPosts, Post, postUpdated } from "../../store/features/postsSlice";
import { Button, Card, Col, Form, Input, Modal, Row, Space } from "antd";
import { EditOutlined, EllipsisOutlined, FileTextOutlined } from "@ant-design/icons";
import PostAuth from "./components/PostAuth";
import TimeAgo from "./components/TimeAgo";
import dayjs from "dayjs";
import ReactionButtons from "./components/ReactionButtons";

const PostList = () => {
	const dispatch = useAppDispatch();
	const [form] = Form.useForm();
	const Item = Form.Item;
	const TextArea = Input.TextArea;

	const posts = useAppSelector(selectAllPosts);
	const postsStatus = useAppSelector((state) => state.posts.status);

	const [postId, setPostId] = useState<string>("");

	useEffect(() => {
		if (postsStatus === "idle") {
			dispatch(fetchPosts());
		}
	}, [dispatch, postsStatus]);

	const orderPosts = posts.slice().sort((a: Post, b: Post) => {
		return dayjs(b.date).valueOf() - dayjs(a.date).valueOf();
	});

	const onCardClick = (postId: string) => {
		setPostId(postId);
		setIsModalOpen(true);
	};

	const onEditClick = (postId: string) => {
		setPostId(postId);
		setIsEditModalOpen(true);
	};

	const renderCards = orderPosts.map((post) => (
		<Col span={6} key={post.id}>
			<Card
				title={post.title}
				bordered={false}
				style={{ marginBottom: "20px" }}
				actions={[
					<FileTextOutlined key='text' onClick={() => onCardClick(post.id)} />,
					<EditOutlined key='edit' onClick={() => onEditClick(post.id)} />,
					<EllipsisOutlined key='ellipsis' />,
				]}
			>
				<p>{post.content.substring(0, 100)}</p>
				<div>
					<TimeAgo date={post.date} />
				</div>
				<ReactionButtons post={post} />
			</Card>
		</Col>
	));

	const [post, setPost] = useState<Post>({} as Post);

	useEffect(() => {
		const d = posts.find(({ id }) => id === postId);
		if (d) {
			form.setFields([
				{ name: "title", value: d.title },
				{ name: "content", value: d.content },
			]);
			setPost(d);
		}
	}, [postId]);

	// 查看详情 modal
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const ShowInfoModal = (
		<Modal
			title={post?.title || ""}
			open={isModalOpen}
			onOk={() => setIsModalOpen(false)}
			onCancel={() => setIsModalOpen(false)}
		>
			<p>{post?.content || ""}</p>
			<PostAuth userId={post?.user || ""} />
			<TimeAgo date={post.date} />
		</Modal>
	);

	// 编辑 modal
	const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
	const onEditOkClick = (postId: string) => {
		const { title, content } = form.getFieldsValue();
		dispatch(postUpdated({ id: postId, title, content }));
		setIsEditModalOpen(false);
	};
	const ShowEditModal = (
		<Modal
			title='编辑'
			open={isEditModalOpen}
			onOk={() => onEditOkClick(post.id)}
			onCancel={() => setIsEditModalOpen(false)}
			getContainer={false}
		>
			<Form form={form} layout='vertical'>
				<Item label='标题' name={"title"} rules={[{ required: true }]}>
					<Input />
				</Item>
				<Item label='内容' name={"content"} rules={[{ required: true }]}>
					<TextArea showCount maxLength={1000} autoSize={{ minRows: 15 }} />
				</Item>
			</Form>
		</Modal>
	);

	return (
		<div>
			<Space style={{ marginBottom: "20px" }}>
				<Button type='primary'>添加文章</Button>
			</Space>
			<Row gutter={18}>{renderCards}</Row>
			{ShowInfoModal}
			{ShowEditModal}
		</div>
	);
};
export default PostList;
