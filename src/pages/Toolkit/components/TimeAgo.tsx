import React from "react";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(RelativeTime);

const TimeAgo: React.FC<{ timestamp: string }> = ({ timestamp }) => {
	const date = dayjs(timestamp);
	const timeAgo = dayjs().from(date);
	return (
		<span title={timestamp}>
			&nbsp; <i>{timeAgo}</i>
		</span>
	);
};

export default TimeAgo;
