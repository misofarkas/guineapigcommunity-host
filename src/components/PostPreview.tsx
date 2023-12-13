/* eslint-disable @next/next/no-img-element */
'use client';

import { FaRegComment } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { formatDate } from '@/utils/dateUtils';
import { type MasterPost } from '@/utils/types';

import BookmarkButton from './BookmarkButton';
import VoteButtons from './VoteButtons';
import Tag from './Tag';

const PostPreview = ({ post }: { post: MasterPost }) => {
	const { data } = useSession();

	return (
		<div className="mx-auto w-full max-w-[600px] overflow-hidden rounded-xl border border-divider bg-secondary-bg">
			<div className="p-8">
				{post.createdBy.name !== undefined && (
					<Link href={`/profile/${post.createdBy.id}`}>
						<div className="text-sm font-semibold uppercase text-secondary-text transition ease-in-out hover:text-primary-accent">
							<p>{post.createdBy.name}</p>
						</div>
					</Link>
				)}
				<Link href={`/post/${post.id}`}>
					<p className="mt-1 text-lg font-medium leading-tight">{post.title}</p>
					<p className="mt-2 text-secondary-text">
						{post.text.length > 250
							? `${post.text.substring(0, 250)}...`
							: post.text}
					</p>

					{post.image !== null && post.image !== '' && (
						<div className="mt-2 flex justify-center">
							<img
								src={post.image}
								alt="post"
								className="h-auto max-h-[400px] max-w-full rounded object-cover"
							/>
						</div>
					)}
				</Link>
				<div className="mt-2 space-x-2 space-y-2">
					{post.tags?.map(tag => (
						<Tag key={tag} tagName={tag} />
					))}
				</div>
			</div>

			<div className="flex items-center gap-x-2 border-t border-divider px-4 py-2 text-sm text-secondary-text sm:gap-x-12">
				<div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-x-12">
					<VoteButtons
						postId={post.id}
						voteCount={post.voteCount}
						isUpvoted={post.isUpvoted}
						isDownvoted={post.isDownvoted}
					/>
					<div className="flex items-center gap-1">
						<FaRegComment />
						<span>{post.commentsCount} comments</span>
					</div>
				</div>
				<div className="flex flex-1 flex-col items-center gap-2 text-right sm:flex-row sm:gap-x-12">
					{data && (
						<BookmarkButton postId={post.id} isActive={post.isBookmarked} />
					)}
					<div className="flex-1 text-right">
						<span className="text-xs">{formatDate(post.createdAt)}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostPreview;
