/* eslint-disable @next/next/no-img-element */
import { FaRegComment, FaRegEdit } from 'react-icons/fa';
import { CiTextAlignLeft } from 'react-icons/ci';
import Link from 'next/link';

import { formatDate } from '@/utils/dateUtils';
import { type MasterPost } from '@/utils/types';

import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import BookmarkButton from './BookmarkButton';

const PostSquished = ({
	post,
	canEdit
}: {
	post: MasterPost;
	canEdit: boolean;
}) => (
	<div className="bg-primary-b w-full border border-divider p-2 xl:min-w-[1200px]">
		<div className="flex items-center gap-4">
			<div className="hidden flex-col items-center border-r border-divider bg-primary-bg py-4 pl-2 pr-4 sm:flex">
				{/* TODO post vote count */}
				<p className="font-semibold text-primary-accent">{123}</p>
				<p className="text-secondary-text">votes</p>
			</div>

			<div className="flex flex-col items-center gap-4">
				<div className="flex gap-1 sm:hidden">
					<p className="inline-block font-semibold text-primary-accent">
						{123}
					</p>
					<p className="text-secondary-text">votes</p>
				</div>

				<div className="flex h-24 w-24 items-center justify-center rounded-lg bg-secondary-bg">
					{post.image === null || post.image === '' ? (
						<CiTextAlignLeft className="h-8 w-8 text-primary-text" />
					) : (
						<img
							src={post.image}
							alt="post preview"
							className="h-24 w-24 rounded object-cover"
						/>
					)}
				</div>
			</div>

			<div className="space-y-2">
				<Link href={`/post/${post.id}`}>
					<p className="font-semibold sm:text-lg">{post.title}</p>
				</Link>

				<div className="flex flex-col gap-2 text-secondary-text sm:flex-row sm:items-center">
					<div className="flex items-center gap-2">
						<span>by</span>
						<Link href={`profile/${post.createdBy.id}`}>
							<span className="font-semibold transition ease-in-out hover:text-primary-accent">
								{post.createdBy.name}
							</span>
						</Link>

						<p>{formatDate(post.createdAt)}</p>
					</div>
					<div className="flex gap-2">
						{post.tags.map(tag => (
							<p
								key={tag}
								className=" rounded-full border border-divider bg-secondary-bg p-2 text-primary-accent"
							>
								{tag}
							</p>
						))}
					</div>
				</div>

				<div className="flex items-center gap-4 text-secondary-text ">
					<div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-x-12">
						<div className="flex items-center gap-1">
							<FaRegComment />
							{post.commentsCount}
						</div>

						<BookmarkButton postId={post.id} isActive={post.isBookmarked} />
					</div>
					{canEdit && (
						<div className="flex flex-col items-center gap-x-2 sm:flex-row sm:gap-x-12">
							<Link
								href={`/post/${post.id}/edit`}
								className="rounded-lg p-2 transition ease-in-out hover:bg-secondary-bg hover:text-primary-text"
							>
								<div className="flex items-center gap-1 px-2">
									<FaRegEdit />
									Edit
								</div>
							</Link>
							<ConfirmDeleteDialog postId={post.id} />
						</div>
					)}
				</div>
			</div>
		</div>
	</div>
);

export default PostSquished;
