import React from 'react';
import { Layout, Menu } from 'antd';
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
} from '@ant-design/icons';
import menus from '../../routes/config';
import type { MenuProps } from 'antd';
import { BaseMenusType } from '../../routes/config';

type MenuItem = Required<MenuProps>['items'][number];
type IProps = {
  collapsed: boolean;
  backgroundColor: string;
};

const { Sider } = Layout;

// TODO 类型待优化
function generateMenus(menus: BaseMenusType[]): MenuItem[] {
  return menus.map(({ label, icon, children }) => {
    if (children) {
      let child = generateMenus(children);
      return {
        label: label,
        icon: icon,
        key: label,
        children: child,
      };
    }
    return {
      label: label,
      icon: icon,
      key: label,
    };
  });
}

const items = generateMenus(menus);

const CustomSider: React.FC<IProps> = ({ collapsed, backgroundColor }) => {
  return (
    <Sider
      style={{ backgroundColor: backgroundColor }}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <Menu mode="inline" items={items} />
    </Sider>
  );
};

export default CustomSider;
