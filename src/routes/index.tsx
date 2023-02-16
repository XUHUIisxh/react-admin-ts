import React, { Suspense, ComponentType, lazy, Children } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFount from "../components/NotFount";
import Loading from "../components/Loading";
import menus from "./config";
import { BaseMenusType } from "./config";

const auth = "role2";

const LazyLoad = (src: React.ReactNode) => (
  <Suspense fallback={<Loading />}>
    {React.createElement(lazy(() => import(`../pages/${src}`)))}
  </Suspense>
);

const checkAuth = (menu: BaseMenusType) => {
  if (menu.auth?.includes(auth)) {
    return menu;
  }
};

const filterAuthorizedMenus = (menus: BaseMenusType[]): BaseMenusType[] => {
  return menus.filter((m) => {
    if (m.children?.length && checkAuth(m)) {
      return (m.children = filterAuthorizedMenus(m.children));
    }
    return checkAuth(m);
  });
};

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
      <Route path="/" element={<Home />} />
      {flatMenu(filterAuthorizedMenus(menus)).map((menu) => {
        return (
          <Route
            path={menu.path}
            element={LazyLoad(menu.src)}
            key={menu.label}
          ></Route>
        );
      })}
      <Route path="*" element={<NotFount />} />
    </Routes>
  );
}

export default CRoutes;
