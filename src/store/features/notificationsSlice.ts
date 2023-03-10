import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { notifications } from "../../api/fakeApi";
import dayjs from "dayjs";
import { UserType } from "./usersSlice";

export interface NotificationType {
	id: string;
	date: string;
	message: string;
	user: UserType;
	read: boolean;
	isNew?: boolean;
}

export type NotificationsInitType = {
	notifications: NotificationType[];
};

const initialState: NotificationsInitType = {
	notifications: [],
};

export const fetchNotifications = createAsyncThunk("notifications/fetchNotifications", async (_, { getState }) => {
	const allNotifications = selectAllNotifications(getState() as RootState);
	const [latestNotification] = allNotifications;
	const latestTimestamp = latestNotification ? latestNotification.date : "";
	const response = await notifications({ since: latestTimestamp });
	return response;
});

const notificationsSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		allNotificationsRead(state) {
			state.notifications.forEach((notification) => {
				notification.read = true;
				notification.isNew = false;
			});
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchNotifications.fulfilled, (state, action) => {
			(action.payload as unknown as NotificationType[]).forEach(
				(notification) => (notification.isNew = !notification.read)
			);
			state.notifications.push(...(action.payload as unknown as NotificationType[]));
			state.notifications.sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
		});
	},
});

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;

export const selectAllNotifications = (state: RootState) => state.notifications.notifications;
