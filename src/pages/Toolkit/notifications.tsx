import { Avatar, List, Button, Tag, Space } from "antd";
import { useAppSelector, useAppDispatch } from "../../store/index";
import { allNotificationsRead, selectAllNotifications } from "../../store/features/notificationsSlice";
import TimeAgo from "./components/TimeAgo";

const Notifications = () => {
	const useDispatch = useAppDispatch();
	const notifications = useAppSelector(selectAllNotifications);

	const renderNotifications = (
		<List
			bordered
			dataSource={notifications}
			renderItem={({ id, message, date, user, isNew }) => (
				<List.Item key={id}>
					<List.Item.Meta avatar={<Avatar src={user.avatarUrl} />} title={user.name} description={message} />
					<TimeAgo date={date} />
					<Space>
						{isNew ? (
							<Tag style={{ marginLeft: "10px" }} color={"#f50"}>
								new
							</Tag>
						) : null}
					</Space>
				</List.Item>
			)}
		/>
	);

	const readAll = () => {
		useDispatch(allNotificationsRead());
	};

	return (
		<div>
			<Space style={{ marginBottom: "20px" }}>
				<Button type='primary' onClick={readAll}>
					一键已读
				</Button>
			</Space>
			{renderNotifications}
		</div>
	);
};

export default Notifications;
