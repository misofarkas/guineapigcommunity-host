'use client';

import { FaReply } from 'react-icons/fa';

const ReplyButton = ({ onClick }: { onClick: () => void }) => (
	<div className="flex items-center gap-1 rounded border border-divider px-4 py-2 hover:border-secondary-bg hover:bg-primary-bg">
		<div className="flex items-center gap-1">
			<FaReply />
			<button onClick={() => onClick()}>reply</button>
		</div>
	</div>
);

export default ReplyButton;
