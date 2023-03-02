import React, { useState } from "react";
import { Layout, ConfigProvider, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import CustomSider from "./CustomSider";

const { Header, Content } = Layout;

interface Props {
	children: React.ReactNode;
}

const { useToken } = theme;

const LayoutStyle = {
	height: "100%",
};

const BaseLayout: React.FC<Props> = (props) => {
	const { token } = useToken();
	const [collapsed, setCollapsed] = useState(false);

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};
	return (
		<ConfigProvider>
			<Layout style={LayoutStyle}>
				<CustomSider collapsed={collapsed} backgroundColor={token.colorBgBase} />
				<Layout>
					<Header style={{ backgroundColor: token.colorBgBase }}>
						{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
							className: "trigger",
							onClick: () => toggleCollapsed(),
						})}
					</Header>
					<Content style={{ margin: "20px", overflow: "hidden", overflowY: "scroll" }}>
						{props.children}
					</Content>
				</Layout>
			</Layout>
		</ConfigProvider>
	);
};

export default BaseLayout;
