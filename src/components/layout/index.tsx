import React, { useState } from "react";
import styled from "styled-components";
import { Layout, Menu, ConfigProvider, theme, GlobalToken, Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Header, Footer, Sider, Content } = Layout;

import type { MenuProps } from "antd";

interface Props {
  children: React.ReactNode;
}

const { useToken } = theme;

const ContainerLayout = styled(Layout)`
  height: 100%;
`;

const LogoDiv = styled.div`
  width: 100%;
  height: 64px;
  background-color: #fff;
`;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const BaseLayout: React.FC<Props> = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const { token } = useToken();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <ConfigProvider>
      <ContainerLayout>
        <Sider
          style={{ backgroundColor: token.colorBgBase }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <LogoDiv />
          <Menu mode="inline" items={items} />
        </Sider>
        <Layout>
          <Header style={{ backgroundColor: token.colorBgBase }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => toggleCollapsed(),
              }
            )}
          </Header>
          <Content style={{ margin: "20px" }}>{props.children}</Content>
        </Layout>
      </ContainerLayout>
    </ConfigProvider>
  );
};

export default BaseLayout;
