import React, { Suspense, lazy } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
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
  path?: string;
  src?: string;
  title?: string;
  icon?: React.ReactNode;
  auth?: string[];
  children?: BaseMenusType[];
}

const menus: BaseMenusType[] = [
  {
    key: "Home",
    label: "Home",
    title: "我是Home",
    path: "/home",
    src: "Home",
    icon: <AppstoreOutlined />,
    auth: ["admin"],
  },
  {
    key: "Bar",
    label: "Bar",
    title: "我是Bar",
    path: "/bar",
    src: "Bar",
    icon: <MailOutlined />,
    auth: ["admin", "role1"],
  },
  {
    key: "father",
    label: "父级",
    title: "我是父级",
    icon: <SettingOutlined />,
    auth: ["admin", "role1", "role2"],
    children: [
      {
        key: "test",
        label: "test",
        title: "我是test",
        path: "/test",
        src: "Test",
        icon: <AppstoreOutlined />,
        auth: ["admin", "role2"],
      },
      {
        key: "Foo",
        label: "Foo",
        title: "我是Foo",
        path: "/foo",
        src: "Foo",
        icon: <AppstoreOutlined />,
        auth: ["admin", "role1"],
      },
    ],
  },
];

export default menus;
