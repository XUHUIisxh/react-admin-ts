import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector, RootState } from "../../store/index";
import { selectAllPosts, fetchPosts, Post } from "../../store/features/postsSlice";
import { Button, Card, Col, Row, Space } from "antd";
import { EditOutlined, EllipsisOutlined, FileTextOutlined } from "@ant-design/icons";

const ShowModal: React.FC<{ postId: string }> = ({ postId }) => {
	return <div></div>;
};

const PostCard = () => {
	const dispatch = useAppDispatch();

	const posts = useAppSelector(selectAllPosts);
	const postsStatus = useAppSelector((state) => state.posts.status);

	useEffect(() => {
		if (postsStatus === "idle") {
			dispatch(fetchPosts());
		}
	}, [dispatch, postsStatus]);

	const orderPosts = posts.slice().sort((a: Post, b: Post) => {
		return b.date - a.date;
	});

	const renderCards = orderPosts.map((post) => (
		<Col span={6} key={post.id}>
			<Card
				title={post.title}
				bordered={false}
				style={{ marginBottom: "20px" }}
				actions={[
					<FileTextOutlined key='text' />,
					<EditOutlined key='edit' />,
					<EllipsisOutlined key='ellipsis' />,
				]}
			>
				{post.content.substring(0, 100)}
			</Card>
		</Col>
	));

	return (
		<div>
			<Space style={{ marginBottom: "20px" }}>
				<Button type='primary'>添加文章</Button>
			</Space>
			<Row gutter={18}>{renderCards}</Row>
		</div>
	);
};
export default PostCard;
