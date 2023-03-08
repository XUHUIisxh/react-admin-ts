import React, { useState } from "react";
import { useAppSelector } from "../../store/index";
import { selectAllUser } from "../../store/features/usersSlice";
import { Avatar, Card, Col, List, Modal, Row } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { selectAllPosts, Post } from "../../store/features/postsSlice";

const { Meta } = Card;

const UserList = () => {
	const allUsers = useAppSelector(selectAllUser);
	const posts = useAppSelector(selectAllPosts);

	const [postForUser, setPostForUser] = useState<Post[]>([] as Post[]);

	const onUnorderClick = (userId: string) => {
		const res = posts.filter((post) => post.user === userId);
		setPostForUser(res);
	};

	const renderUserCards = (
		<Row gutter={18}>
			{allUsers.map(({ id, imageUrl, avatarUrl, name, userName }) => (
				<Col span={6} key={id}>
					<Card
						style={{ marginBottom: "20px" }}
						cover={<img src={imageUrl} />}
						actions={[<UnorderedListOutlined key='Unordered' onClick={() => onUnorderClick(id)} />]}
					>
						<Meta avatar={<Avatar src={avatarUrl} />} title={name} description={`网名：${userName}`}></Meta>
					</Card>
				</Col>
			))}
		</Row>
	);

	const renderModal = (
		<Modal
			title={"文章列表"}
			open={!!postForUser.length}
			onOk={() => setPostForUser([])}
			onCancel={() => setPostForUser([])}
		>
			<List
				dataSource={postForUser}
				renderItem={(item, index) => (
					<List.Item>
						<List.Item.Meta title={item.title} description={item.content.substring(0, 20)}></List.Item.Meta>
					</List.Item>
				)}
			></List>
		</Modal>
	);

	return (
		<div>
			{renderUserCards}
			{renderModal}
		</div>
	);
};

export default UserList;
