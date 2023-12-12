import { type post, type user, type vote_post } from '.prisma/client';

import {
	toVoteTypePrisma,
	toVoteTypeZod
} from '@/server/mappers/vote-type-mapper';
import { toUserZod } from '@/server/mappers/user-mapper';
import { toPostZod } from '@/server/mappers/post-mapper';

export const toVotePostPrisma = (
	createdById: number,
	postId: number,
	voteType: string
) => ({
	created_by: createdById,
	post_id: postId,
	type: toVoteTypePrisma[voteType]
});

export const toVotePostZod = (
	entity: { user: user; post: post } & vote_post
) => ({
	createdBy: toUserZod(entity.user),
	post: toPostZod({ user: entity.user, ...entity.post }),
	createdAt: entity.created_at.toString(),
	type: toVoteTypeZod[entity.type]
});
