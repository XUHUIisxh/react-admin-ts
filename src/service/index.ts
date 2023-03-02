import axios from "axios";
import { message } from "antd";

const TIME_OUT = 5000;
const BASE_URL = "/";

const service = axios.create({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
});

service.interceptors.request.use(
	(config) => {
		showLoading();
		return config;
	},
	(err) => {
		hideLoading();
		message.error("请求异常！");
		return Promise.reject(err);
	}
);

service.interceptors.response.use(
	(response) => {
		hideLoading();
		const data = response.data;
		return data;
	},
	(err) => {
		hideLoading();
		message.error("响应异常！");
		return Promise.reject(err);
	}
);

const LOADING_DURATION = 2;

const showLoading = () => {
	message.loading({
		content: "数据加载中...",
		duration: LOADING_DURATION,
	});
};

const hideLoading = () => {
	message.destroy();
};

export default service;
