import { type NextRequest } from 'next/server';

import { bookmarkSchema } from '@/server/zod-schema';
import { db } from '@/server/db';
import {
	toBookmarkPrisma,
	toBookmarkZod
} from '@/server/mappers/bookmark-mapper';
import { getServerAuthSession } from '@/server/auth';

export const POST = async (
	request: NextRequest,
	{ params }: { params: { id: string } }
) => {
	const session = await getServerAuthSession();

	if (session !== null) {
		const userId = +(session?.user.id ?? -1);

		const newBookmark = await db.bookmark.create({
			include: {
				user: true,
				post: true
			},
			data: toBookmarkPrisma(userId, +params.id)
		});

		return Response.json(bookmarkSchema.parse(toBookmarkZod(newBookmark)));
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

		await db.bookmark.delete({
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
