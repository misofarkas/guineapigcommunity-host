import {
	$Enums,
	type comment,
	type post,
	type user,
	type vote_post,
	type vote_comment
} from '.prisma/client';
import { type z } from 'zod';

import { type postFormSchema } from '@/server/zod-schema';
import { toUserZod } from '@/server/mappers/user-mapper';
import { toCommentsZodWithParentCommentId } from '@/server/mappers/comment-mapper';
import {
	toTagTypesPrisma,
	toTagTypesZod
} from '@/server/mappers/tag-type-mapper';
import { type PostMasterPrisma } from '@/server/types';

import vote_type = $Enums.vote_type;

export const toPostsMasterZod = (posts: PostMasterPrisma[]) =>
	posts.map(post => {
		const votes = post.vote_post;
		const vote = votes.length > 0 ? votes[0] : null;

		return {
			...toPostZod(post),
			isBookmarked: post.bookmark.length > 0,
			isUpvoted: vote?.type === vote_type.upvote,
			isDownvoted: vote?.type === vote_type.downvote,
			commentsCount: post.comment.length
		};
	});

export const toPostZod = (entity: { user: user } & post) => ({
	...toPostZodWithoutUser(entity),
	createdBy: toUserZod(entity.user)
});

export const toPostDetailZod = (
	entity: {
		user: user;
		comment: ({ user: user; vote_comment: vote_comment[] } & comment)[];
		vote_post: ({ user: user } & vote_post)[];
	} & post
) => {
	const upvoters = entity.vote_post
		.filter(v => v.type === vote_type.upvote)
		.map(v => v.user);
	const downvoters = entity.vote_post
		.filter(v => v.type === vote_type.downvote)
		.map(v => v.user);

	return {
		...toPostZod(entity),
		comments: toCommentsZodWithParentCommentId(entity.comment),
		upvoters,
		downvoters
	};
};

export const toPostZodWithoutUser = (entity: post) => ({
	...entity,
	tags: toTagTypesZod(entity.tags),
	createdAt: entity.created_at.toString()
});

export const toPostPrisma = (
	post: z.infer<typeof postFormSchema>,
	createdById: number
) => ({
	title: post.title,
	text: post.text,
	tags: toTagTypesPrisma(post.tags ?? []),
	created_by: createdById,
	image: post.image
});
