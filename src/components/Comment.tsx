'use client';

import { FaArrowUp, FaArrowDown, FaRegComment } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { formatDate } from '@/utils/dateUtils';
import { type Post, type CommentWithReplies } from '@/utils/types';

import ReplyButton from './ReplyButton';
import Reply from './Reply';

const Comment = ({
	parentPost,
	comment
}: {
	parentPost: Post;
	comment: CommentWithReplies;
}) => {
	const { data } = useSession();
	const [reply, setReply] = useState(false);

	return (
		<div className="w-full overflow-hidden">
			<div className="overflow-hidden rounded-lg bg-secondary-bg shadow-md">
				<div className="p-4">
					{comment.createdBy.name !== undefined && (
						<div className="text-sm font-semibold uppercase text-secondary-text transition ease-in-out hover:text-primary-accent">
							<p>{comment.createdBy.name}</p>
						</div>
					)}
					<p className="mt-2">{comment.text}</p>
				</div>
				<div className="flex items-center justify-between  gap-x-12 border-divider p-3 px-4 py-2 text-sm text-secondary-text">
					{comment.replies && (
						<div className="flex items-center gap-1">
							<FaRegComment />
							<span>{comment.replies.length} replies</span>
						</div>
					)}
					{data && <ReplyButton onClick={() => setReply(true)} />}
					<div className="flex-1 text-right">
						<span className="text-xs">{formatDate(comment.createdAt)}</span>
					</div>
				</div>
			</div>
			{reply && (
				<Reply
					post={parentPost}
					comment={comment}
					onHide={() => setReply(false)}
				/>
			)}
			{comment.replies && (
				<div className="replies mt-4 flex flex-col gap-4 border-l-2 border-gray-600 pl-4">
					{comment.replies.map(reply => (
						<Comment key={reply.id} parentPost={parentPost} comment={reply} />
					))}
				</div>
			)}
		</div>
	);
};

export default Comment;
