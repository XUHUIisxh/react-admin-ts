import { useAppDispatch } from "../../store/index";
import { fetchUsers } from "../../store/features/usersSlice";
import { useAsyncEffect } from "ahooks";
import { Tabs, TabsProps } from "antd";
import PostList from "./postList";

const TabsWrap: React.FC = () => {
	const dispatch = useAppDispatch();
	useAsyncEffect(async () => {
		await dispatch(fetchUsers());
	}, []);

	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "文章",
			children: <PostList />,
		},
	];

	return <Tabs defaultActiveKey='1' items={items} />;
};

export default TabsWrap;
