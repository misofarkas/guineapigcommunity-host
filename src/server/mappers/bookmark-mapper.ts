import { type bookmark, type post, type user } from '.prisma/client';

import { toUserZod } from '@/server/mappers/user-mapper';
import { toPostZod } from '@/server/mappers/post-mapper';

export const toBookmarkPrisma = (createdById: number, postId: number) => ({
	created_by: createdById,
	post_id: postId
});

export const toBookmarkZod = (
	entity: { user: user; post: post } & bookmark
) => ({
	createdBy: toUserZod(entity.user),
	post: toPostZod({ user: entity.user, ...entity.post }),
	createdAt: entity.created_at.toString()
});
