import React from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
/**
 * @key key
 * @label menuItem label
 * @path route path
 * @src component src
 * @title web title
 * @icon menu icon
 * @auth auth list
 * @children children menus
 */
export interface BaseMenusType {
	key: React.Key;
	label: React.ReactNode;
	title?: string;
	path?: string;
	auth?: string[];
	component?: string;
	icon?: React.ReactNode;
	children?: BaseMenusType[];
}

const menus: BaseMenusType[] = [
	{
		key: "Home",
		label: "Home",
		title: "我是Home",
		path: "/home",
		component: "Home",
		icon: <AppstoreOutlined />,
		auth: ["admin"],
	},
	{
		key: "Bar",
		label: "Bar",
		title: "我是Bar",
		path: "/bar",
		component: "Bar",
		icon: <MailOutlined />,
		auth: ["admin", "role1"],
	},
	{
		key: "father",
		label: "父级",
		icon: <SettingOutlined />,
		auth: ["admin", "role1", "role2"],
		children: [
			{
				key: "test",
				label: "test",
				title: "我是test",
				path: "/test",
				component: "Test",
				icon: <AppstoreOutlined />,
				auth: ["admin", "role2"],
			},
			{
				key: "Foo",
				label: "Foo",
				title: "我是Foo",
				path: "/foo",
				component: "Foo",
				icon: <AppstoreOutlined />,
				auth: ["admin", "role1"],
			},
		],
	},
	{
		key: "ToolKit",
		label: "Redux/ToolKit",
		icon: <AppstoreOutlined />,
		auth: ["admin"],
		children: [
			{
				key: "postsList",
				label: "postsList",
				title: "postsList",
				path: "/postsList",
				component: "Toolkit",
				icon: <AppstoreOutlined />,
				auth: ["admin", "role1"],
			},
			{
				key: "SinglePostPage",
				label: "SinglePostPage",
				title: "SinglePostPage",
				path: "/SinglePostPage/:postId",
				component: "Toolkit/SinglePostPage",
				icon: <AppstoreOutlined />,
				auth: ["admin", "role1"],
			},
			{
				key: "EditPostForm",
				label: "EditPostForm",
				title: "EditPostForm",
				path: "/EditPostForm/:postId",
				component: "Toolkit/EditPostForm",
				icon: <AppstoreOutlined />,
				auth: ["admin", "role1"],
			},
		],
	},
];

export default menus;
