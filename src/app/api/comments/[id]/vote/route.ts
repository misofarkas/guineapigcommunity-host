import { type NextRequest } from 'next/server';

import { voteCommentSchema } from '@/server/zod-schema';
import { db } from '@/server/db';
import { getServerAuthSession } from '@/server/auth';
import { toVoteTypePrisma } from '@/server/mappers/vote-type-mapper';
import {
	toVoteCommentPrisma,
	toVoteCommentZod
} from '@/server/mappers/vote-comment-mapper';

export const PUT = async (
	request: NextRequest,
	{ params }: { params: { id: string } }
) => {
	const session = await getServerAuthSession();
	const voteType = request.nextUrl.searchParams.get('voteType');

	if (session !== null && voteType !== null) {
		const createdById = +(session?.user.id ?? -1);

		const upsertResult = await db.vote_comment.upsert({
			where: {
				created_by_comment_id: {
					created_by: createdById,
					comment_id: +params.id
				}
			},
			update: {
				type: toVoteTypePrisma[voteType]
			},
			create: toVoteCommentPrisma(createdById, +params.id, voteType),
			include: {
				user: true,
				comment: true
			}
		});

		return Response.json(
			voteCommentSchema.parse(toVoteCommentZod(upsertResult))
		);
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

		await db.vote_comment.delete({
			where: {
				created_by_comment_id: {
					created_by: createdById,
					comment_id: +params.id
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
