import React from "react";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(RelativeTime);

const TimeAgo: React.FC<{ date: string }> = ({ date }) => {
	const timeAgo = dayjs().from(date);
	return (
		<span title={date}>
			TimeAgo: <i>{timeAgo}</i>
		</span>
	);
};

export default TimeAgo;
