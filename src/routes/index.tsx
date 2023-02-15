import React, { Suspense, ComponentType, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NotFount from '../components/NotFount';
import menus from './config';
import { BaseMenusType } from './config';

const Loading = <div>Loading...</div>;

const LazyLoad = (src: React.ReactNode) => (
  <Suspense fallback={Loading}>
    {React.createElement(lazy(() => import(`../pages/${src}`)))}
  </Suspense>
);

function CRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {['Bar', 'Foo'].map((menu) => {
        const r = menus.find(({ src }) => src === menu) as BaseMenusType;
        return (
          <Route path={r.path} element={LazyLoad(r.src)} key={r.label}></Route>
        );
      })}
      <Route path="*" element={<NotFount />} />
    </Routes>
  );
}

export default CRoutes;
