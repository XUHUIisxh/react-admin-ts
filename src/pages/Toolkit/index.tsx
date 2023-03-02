import AddPostForm from "./components/AddPostForm";
import PostsList from "./components/postsList";
import { useAppDispatch } from "../../store/index";
import { fetchUser } from "../../store/features/usersSlice";
import { useAsyncEffect } from "ahooks";
import { Tabs, TabsProps } from "antd";
import PostCard from "./postCard";

const TabsWrap: React.FC = () => {
	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "文章",
			children: <Index />,
		},
	];

	return <Tabs defaultActiveKey='1' items={items} />;
};

const Index = () => {
	const dispatch = useAppDispatch();
	useAsyncEffect(async () => {
		await dispatch(fetchUser());
	}, []);
	return <PostCard />;
};

export default TabsWrap;
