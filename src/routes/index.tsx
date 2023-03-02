import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFount from "../components/NotFount";
import Loading from "../components/Loading";
import menus from "./config";
import { BaseMenusType } from "./config";

const auth = "admin";

/** 懒加载 */
const LazyLoad = (component: React.ReactNode) => (
	// TODO 需要增加判断 component 的文件夹是否存在  tips：可以利用 fs 文件系统
	<Suspense fallback={<Loading />}>{React.createElement(lazy(() => import(`../pages/${component}`)))}</Suspense>
);

/** 检查是否拥有权限 */
const checkAuth = (menu: BaseMenusType) => {
	if (menu.auth?.includes(auth)) {
		return menu;
	}
};

/** 提取拥有权限的路由 */
export const filterAuthorizedMenus = (menus: BaseMenusType[]): BaseMenusType[] => {
	return menus.filter((m) => {
		if (m.children?.length) {
			return (m.children = filterAuthorizedMenus(m.children));
		}
		return checkAuth(m);
	});
};

/** 拉平menus */
function flatMenu(menus: BaseMenusType[]) {
	let arr: BaseMenusType[] = [];
	menus.forEach((m) => {
		if (m.children) {
			flatMenu(m.children).map((c) => {
				arr.push(c);
			});
		} else {
			arr.push(m);
		}
	});
	return arr;
}

function CRoutes() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			{flatMenu(filterAuthorizedMenus(menus)).map((menu) => {
				return <Route path={menu.path} element={LazyLoad(menu.component)} key={menu.key}></Route>;
			})}
			<Route path='*' element={<NotFount />} />
		</Routes>
	);
}

export default CRoutes;
