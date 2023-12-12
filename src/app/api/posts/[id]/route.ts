import NotFound from 'next/dist/client/components/not-found-error';
import { type NextRequest } from 'next/server';

import {
	postDetailSchema,
	postFormSchema,
	postSchema
} from '@/server/zod-schema';
import { db } from '@/server/db';
import {
	toPostDetailZod,
	toPostPrisma,
	toPostZod
} from '@/server/mappers/post-mapper';
import { getServerAuthSession } from '@/server/auth';

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
	const session = await getServerAuthSession();

	if (session !== null) {
		const createdById = +(session?.user.id ?? -1);
		const body = await request.json();
		const post = postFormSchema.parse(body);

		const updatedPost = await db.post.update({
			include: {
				user: true
			},
			where: {
				id: +params.id,
				user: {
					id: createdById
				}
			},
			data: toPostPrisma(post, createdById)
		});

		return Response.json(postSchema.parse(toPostZod(updatedPost)));
	} else {
		return new Response('', {
			status: 401
		});
	}
};

export const GET = async (_: Request, { params }: { params: { id: string } }) => {
	const post = await db.post.findFirst({
		where: {
			id: +params.id
		},
		include: {
			user: true,
			comment: {
				include: {
					user: true,
					vote_comment: true
				}
			},
			vote_post: {
				include: {
					user: true
				}
			},
		},
	});

	if (post === null) {
		throw NotFound();
	}

	return Response.json(postDetailSchema.parse(toPostDetailZod(post)));
};

export const DELETE = async (_: NextRequest, { params }: { params: { id: string } }) => {
    const session = await getServerAuthSession();

    if (session != null) {
        const createdById = +(session?.user.id ?? -1);

        await db.post.delete({
            include: {
                user: true
            },
            where: {
                id: +params.id,
                user: {
                    id: createdById
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
