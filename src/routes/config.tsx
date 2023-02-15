import React, { Suspense, lazy } from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
/**
 * @label menuItem label
 * @path route path
 * @src component src
 * @title web title
 * @icon menu icon
 * @auth auth list
 * @children children menus
 */
export interface BaseMenusType {
  label: string;
  path: string;
  src?: string;
  title?: string;
  icon?: React.ReactNode;
  auth?: string[];
  children?: BaseMenusType[];
}

const menus: BaseMenusType[] = [
  {
    label: 'Home',
    title: '我是Home',
    path: '/',
    src: 'Home',
    icon: <AppstoreOutlined />,
    auth: ['admin'],
  },
  {
    label: 'Bar',
    title: '我是Bar',
    path: '/Bar',
    src: 'Bar',
    icon: <MailOutlined />,
    auth: ['admin', 'role1'],
  },
  {
    label: '父级',
    title: '我是父级',
    path: '/Foo',
    icon: <SettingOutlined />,
    auth: ['admin', 'role2'],
    children: [
      {
        label: 'test',
        title: '我是test',
        path: '/test',
        src: 'Test',
        icon: <AppstoreOutlined />,
        auth: ['admin'],
      },
    ],
  },
];

export default menus;
