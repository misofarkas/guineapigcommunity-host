import { type z } from 'zod';
import {
	$Enums,
	type comment,
	type post,
	type user,
	type vote_comment
} from '.prisma/client';

import { type commentFormSchema } from '@/server/zod-schema';
import { toPostZodWithoutUser } from '@/server/mappers/post-mapper';
import { toUserZod } from '@/server/mappers/user-mapper';

import vote_type = $Enums.vote_type;

export const toCommentZod = (
	entity: {
		comment: ({ user: user } & comment) | null;
		post: post;
		user: user;
	} & comment
) => ({
	...entity,
	createdAt: entity.created_at.toString(),
	createdBy: toUserZod(entity.user),
	parentPost: toPostZodWithoutUser(entity.post),
	parentComment: toCommentZodWithoutParents(entity.comment)
});

export const toCommentZodWithoutParents = (
	entity: ({ user: user } & comment) | null
) => {
	if (entity === null) {
		return null;
	} else {
		return {
			...entity,
			createdAt: entity.created_at.toString(),
			createdBy: toUserZod(entity.user)
		};
	}
};

export const toCommentsZodWithParentCommentId = (
	entities: ({ user: user; vote_comment: vote_comment[] } & comment)[]
) =>
	entities.map(e => {
		const upvoters = e.vote_comment.filter(v => v.type === vote_type.upvote);
		const downvoters = e.vote_comment.filter(
			v => v.type === vote_type.downvote
		);

		return {
			...toCommentZodWithoutParents(e),
			parentCommentId: e.parent_comment_id,
			voteCount: upvoters.length - downvoters.length
		};
	});

export const toCommentPrisma = (
	comment: z.infer<typeof commentFormSchema>,
	createdById: number
) => ({
	text: comment.text,
	created_by: createdById,
	parent_post_id: comment.parentPostId,
	parent_comment_id: comment.parentCommentId
});
