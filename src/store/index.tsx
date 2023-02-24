import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import counterSlice from "./features/counterSlice";
import usersSlice from "./features/usersSlice";
import postSlice from "./features/postSlice";

// TODO 待增增强中间件等内容 https://cn.redux.js.org/tutorials/essentials/part-1-overview-concepts
const store = configureStore({
	reducer: {
		counter: counterSlice,
		users: usersSlice,
		posts: postSlice,
	},
});

// 从store本身推断出 RootState 和 AppDispatch 类型
export type RootState = ReturnType<typeof store.getState>;

// 推断出类型 { counter: CounterSlice }
export type AppDispatch = typeof store.dispatch;

// 在整个应用程序中使用，而不是简单的 useDispatch 和 useSelector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
