// 引入相关hooks
import { useSelector, useDispatch } from "react-redux";
// 引入对应方法
import { increment, decrement } from "../../store/features/counterSlice";
import { RootState } from "../../store/index";

const Test = () => {
	// 通过useSelector 直接拿到store中定义的value
	const { value } = useSelector((store: RootState) => store.counter);
	// 通过useDispatch派发事件
	const dispatch = useDispatch();
	return (
		<div>
			<div>当前数字：{value}</div>
			<button
				onClick={() => {
					dispatch(increment());
				}}
			>
				increment
			</button>
			<button
				onClick={() => {
					dispatch(decrement());
				}}
			>
				decrement
			</button>
		</div>
	);
};

export default Test;
