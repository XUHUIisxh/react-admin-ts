import React from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export interface BaseMenus {
  key: string;
  title: string;
  icon?: string;
  componet?: string;
  auth?: string[];
}

export interface SubMenus extends BaseMenus {
  subs?: SubMenus[];
}

const Home = React.lazy(() => import("../pages/Home"));
const Bar = React.lazy(() => import("../pages/Bar"));
const Foo = React.lazy(() => import("../pages/Foo"));

const menus: any[] = [
  {
    name: "Home",
    path: "/",
    title: "我是Home",
    component: Home,
    icon: AppstoreOutlined,
    auth: ["admin"],
  },
  {
    name: "Bar",
    path: "/Bar",
    title: "我是Bar",
    component: Bar,
    icon: MailOutlined,
    auth: ["admin"],
  },
  {
    name: "Foo",
    path: "/Foo",
    title: "我是Foo",
    component: Foo,
    icon: SettingOutlined,
    auth: ["admin"],
  },
];

export default menus;
