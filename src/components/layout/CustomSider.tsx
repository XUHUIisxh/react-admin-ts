import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import menus from "../../routes/config";
import type { MenuProps } from "antd";
import { BaseMenusType } from "../../routes/config";
import { filterAuthorizedMenus } from "../../routes/index";

type MenuItem = Required<MenuProps>["items"][number];
type IProps = {
	collapsed: boolean;
	backgroundColor: string;
};

const { Sider } = Layout;

// TODO 待优化
function generateMenus(menus: BaseMenusType[]): MenuItem[] {
	let menusArr: MenuItem[] = [];
	menus.map(({ key, label, icon, children, component }) => {
		// 返回组件的判断方式：首先是否包含子组件（是否为二级路由或多级路由），不包含则判断component属性是否存在（单级路由）
		if (children?.length) {
			menusArr.push({
				label: label,
				icon: icon,
				key: key,
				children: generateMenus(children),
			});
			return;
		}
		if (component) {
			menusArr.push({
				label: label,
				icon: icon,
				key: key,
			});
			return;
		}
	});
	return menusArr;
}

const items = generateMenus(filterAuthorizedMenus(menus));

const CustomSider: React.FC<IProps> = (props) => {
	const navigate = useNavigate();

	const onSelect: MenuProps["onSelect"] = ({ key }) => {
		navigate(key);
	};

	return (
		<Sider
			style={{ backgroundColor: props.backgroundColor }}
			trigger={null}
			collapsible
			collapsed={props.collapsed}
		>
			<Menu mode='inline' items={items} onSelect={onSelect} />
		</Sider>
	);
};

export default CustomSider;
