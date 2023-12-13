'use client';

import { FaRegComment } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

import { formatDate } from '@/utils/dateUtils';
import { type DetailedPost } from '@/utils/types';

import ReplyButton from './ReplyButton';
import Tag from './Tag';
import Reply from './Reply';
import VoteButtons from './VoteButtons';

const Post = ({ post }: { post: DetailedPost }) => {
	const { data } = useSession();
	const [reply, setReply] = useState(false);

	return (
		<>
			<div className="w-full max-w-[800px] overflow-hidden rounded-lg bg-secondary-bg shadow-lg">
				{post.image && (
					<div className="max-w-[600px] overflow-hidden rounded-t-lg p-6 duration-150 ease-in-out">
						<Image
							src={post.image}
							width={800}
							height={450}
							alt={post.title}
							className="object-cover object-center"
						/>
					</div>
				)}
				<div className="p-6">
					{post.createdBy.name !== undefined && (
						<Link href={`/profile/${post.createdBy.id}`}>
							<div className="text-sm font-semibold uppercase text-secondary-text transition ease-in-out hover:text-primary-accent">
								<p>{post.createdBy.name}</p>
							</div>
						</Link>
					)}
					<h1 className="mt-1 text-lg font-medium leading-tight">
						{post.title}
					</h1>
					<p className="mt-2">{post.text}</p>
					<div className="space-x-2 space-y-2">
						{post.tags?.map(tag => (
							<Tag key={tag} tagName={tag} />
						))}
					</div>
				</div>
				<div className="flex items-center gap-x-12 border-t border-divider px-4 py-2 text-sm text-secondary-text">
					<VoteButtons
						postId={post.id}
						voteCount={post.upvoters.length - post.downvoters.length}
						isUpvoted={post.isUpvoted}
						isDownvoted={post.isDownvoted}
					/>
					<div className="flex items-center gap-1">
						<FaRegComment />
						<span>{post.comments.length} comments</span>
					</div>
					{data && <ReplyButton onClick={() => setReply(true)} />}
					<div className="flex-1 text-right">
						<span className="text-xs">{formatDate(post.createdAt)}</span>
					</div>
				</div>
			</div>
			{reply && <Reply postId={post.id} onHide={() => setReply(false)} />}
		</>
	);
};

export default Post;
