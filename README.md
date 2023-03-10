# React-admin-ts

## 设想

当前admin模板仅提供给自己使用，所以考虑的东西不够全面

- 根据账号权限加载对应的路由
- 刷新页面对应路由高亮
- redux状态管理器
- 数据持久化
- axios二次封装
- 自定义样式的解决方案

## 关于路由部分

[react-router-dom@6](https://juejin.cn/post/7187199524903845946)

目前设想的是 前端将每个路由的权限规定好 后端通过返回角色权限字段来加载路信息
需要考虑的场景

1. 当前路由拥有多个子路由  但是存在不需要展示在menus中的路由
2. 当前路由拥有多个子路由  进入不需要展示的子路由中需要返回按钮返回上一级
3. 刷新页面根据浏览器地址栏高亮 menus

## 关于状态管理 使用 @reduxjs/toolkit 本质是上简化redux的一些操作

1. [参考文档](https://cn.redux.js.org/tutorials/essentials/part-1-overview-concepts)
2. [配合typescript中文文档](https://redux-toolkit-cn.netlify.app/usage/usage-with-typescript)

## eslint

1. [eslint官网](https://zh-hans.eslint.org/)
2. [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react/#shareable-configs)
3. [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)

## prettier

1. [prettier官网](https://www.prettier.cn/docs//install.html)
2. [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)

## mock

1. [mswjs](https://github.com/mswjs/data)
2. [faker-js](https://github.com/faker-js/faker)
3. [掘金例子](https://juejin.cn/post/7018732383067176991#heading-3)
