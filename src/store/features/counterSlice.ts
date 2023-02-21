import { createSlice } from "@reduxjs/toolkit";

export interface CounterSlice {
  value: number;
  title: string;
}

const initialState: CounterSlice = {
  value: 0,
  title: "redux toolkit pre",
};

// 创建一个slice （切片）
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// 导出加减方法
export const { increment, decrement } = counterSlice.actions;

// 默认导出
export default counterSlice.reducer;
