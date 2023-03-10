import { useAppDispatch } from "../../store/index";
import { fetchUsers } from "../../store/features/usersSlice";
import { useAsyncEffect } from "ahooks";
import { Button, Tabs, TabsProps } from "antd";
import PostList from "./postList";
import UserList from "./userList";
import Notifications from "./notifications";
import { fetchNotifications } from "../../store/features/notificationsSlice";

const TabsWrap: React.FC = () => {
	const dispatch = useAppDispatch();
	useAsyncEffect(async () => {
		await dispatch(fetchUsers());
		await dispatch(fetchNotifications());
	}, []);

	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "Posts",
			children: <PostList />,
		},
		{
			key: "2",
			label: "Users",
			children: <UserList />,
		},
		{
			key: "3",
			label: "Notifications",
			children: <Notifications />,
		},
	];

	const refresh = () => {
		dispatch(fetchNotifications());
	};

	const operations = (
		<Button type='primary' onClick={refresh}>
			Refresh Notifications
		</Button>
	);

	return (
		<div>
			<Tabs tabBarExtraContent={operations} defaultActiveKey='1' items={items} />
		</div>
	);
};

export default TabsWrap;
