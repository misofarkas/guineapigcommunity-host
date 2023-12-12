import { type comment, type user, type vote_comment } from '.prisma/client';

import {
	toVoteTypePrisma,
	toVoteTypeZod
} from '@/server/mappers/vote-type-mapper';
import { toUserZod } from '@/server/mappers/user-mapper';
import { toCommentZodWithoutParents } from '@/server/mappers/comment-mapper';

export const toVoteCommentPrisma = (
	createdById: number,
	commentId: number,
	voteType: string
) => ({
	created_by: createdById,
	comment_id: commentId,
	type: toVoteTypePrisma[voteType]
});

export const toVoteCommentZod = (
	entity: { user: user; comment: comment } & vote_comment
) => ({
	createdBy: toUserZod(entity.user),
	comment: toCommentZodWithoutParents({ user: entity.user, ...entity.comment }),
	createdAt: entity.created_at.toString(),
	type: toVoteTypeZod[entity.type]
});
