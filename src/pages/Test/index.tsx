import { increment, decrement } from "../../store/features/counterSlice";
import { useAppDispatch, useAppSelector } from "../../store/index";

const Test = () => {
	// 通过useAppSelecto 直接拿到store中定义的value
	const { value } = useAppSelector((store) => store.counter);
	// 通过useAppDispatch派发事件
	const dispatch = useAppDispatch();
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
