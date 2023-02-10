import React, { Suspense, ComponentType } from "react";
import { Routes, Route } from "react-router-dom";
import Foo from "../pages/Foo";
import Bar from "../pages/Bar";
import NotFount from "../components/NotFount";
import Home from "../pages/Home";
import { BaseMenus } from "./config";
import RouterConfig from "./config";
import { find } from "lodash";

function lazy(Component: ComponentType) {
  return (
    <Suspense fallback={<div>....Loading</div>}>
      <Component />
    </Suspense>
  );
}

function CRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {["Bar", "Foo"].map((routeName) => {
        const r = RouterConfig.find(({ name }) => name === routeName);
        return (
          <Route path={r.path} element={lazy(r.component)} key={r.name}></Route>
        );
      })}
      <Route path="*" element={<NotFount />} />
    </Routes>
  );
}

export default CRoutes;
