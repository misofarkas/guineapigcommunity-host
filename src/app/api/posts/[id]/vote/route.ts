import { type NextRequest } from 'next/server';

import { votePostSchema } from '@/server/zod-schema';
import { db } from '@/server/db';
import { getServerAuthSession } from '@/server/auth';
import {
	toVotePostPrisma,
	toVotePostZod
} from '@/server/mappers/vote-post-mapper';
import { toVoteTypePrisma } from '@/server/mappers/vote-type-mapper';

export const PUT = async (
	request: NextRequest,
	{ params }: { params: { id: string } }
) => {
	const session = await getServerAuthSession();
	const voteType = request.nextUrl.searchParams.get('voteType');

	if (session !== null && voteType !== null) {
		const createdById = +(session?.user.id ?? -1);

		const upsertResult = await db.vote_post.upsert({
			where: {
				created_by_post_id: {
					created_by: createdById,
					post_id: +params.id
				}
			},
			update: {
				type: toVoteTypePrisma[voteType]
			},
			create: toVotePostPrisma(createdById, +params.id, voteType),
			include: {
				user: true,
				post: true
			}
		});

		return Response.json(votePostSchema.parse(toVotePostZod(upsertResult)));
	} else {
		return new Response('', {
			status: 401
		});
	}
};

export const DELETE = async (
	_: NextRequest,
	{ params }: { params: { id: string } }
) => {
	const session = await getServerAuthSession();

	if (session !== null) {
		const createdById = +(session?.user.id ?? -1);

		await db.vote_post.delete({
			where: {
				created_by_post_id: {
					created_by: createdById,
					post_id: +params.id
				}
			}
		});

		return Response.json(true);
	} else {
		return new Response('', {
			status: 401
		});
	}
};
