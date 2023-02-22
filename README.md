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

目前设想的是 前端将每个路由的权限规定好 后端通过返回角色权限字段来加载路信息

## 关于状态管理 使用 @reduxjs/toolkit 本质是上简化redux的一些操作

[参考文档](https://cn.redux.js.org/tutorials/essentials/part-1-overview-concepts)

## eslint

1. [eslint官网](https://zh-hans.eslint.org/)
2. [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react/#shareable-configs)
3. [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)

## prettier

1. [prettier官网](https://www.prettier.cn/docs//install.html)
2. [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
