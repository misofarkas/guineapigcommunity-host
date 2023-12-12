import { type NextRequest } from 'next/server';

import { db } from '@/server/db';
import {
	postFormSchema,
	postMasterSchema,
	postSchema
} from '@/server/zod-schema';
import {
	toPostPrisma,
	toPostsMasterZod,
	toPostZod
} from '@/server/mappers/post-mapper';
import { toTagTypesPrisma } from '@/server/mappers/tag-type-mapper';
import { getServerAuthSession } from '@/server/auth';

export const GET = async (request: NextRequest) => {
	const session = await getServerAuthSession();
	const createdByIdString = session?.user.id;
	const createdById = createdByIdString ? +createdByIdString : -1;

	const searchParams = request.nextUrl.searchParams;
	const titleParam = searchParams.get('title');
	const tagParam = searchParams.get('tag');
	const bookmark = searchParams.get('bookmark');
	const history = searchParams.get('history');

	const entities = await db.post.findMany({
		where: {
			...(history
				? {
						created_by: createdById
				  }
				: {}),
			...(titleParam
				? {
						title: {
							search: titleParam.split(' ').join('&')
						}
				  }
				: {}),
			...(tagParam
				? {
						tags: {
							hasEvery: toTagTypesPrisma(tagParam?.split(','))
						}
				  }
				: {}),
			...(bookmark === 'true' && createdById !== -1
				? {
						bookmark: {
							some: {
								created_by: createdById
							}
						}
				  }
				: {})
		},
		include: {
			user: true,
			comment: true,
			bookmark: {
				where: {
					created_by: createdById
				}
			},
			vote_post: {
				where: {
					created_by: createdById
				}
			}
		}
	});

	return Response.json(
		postMasterSchema.array().parse(toPostsMasterZod(entities))
	);
};

export const POST = async (request: NextRequest) => {
	const session = await getServerAuthSession();

	if (session !== null) {
		const createdById = +(session?.user.id ?? -1);
		const body = await request.json();
		const post = postFormSchema.parse(body);

		const newPost = await db.post.create({
			include: {
				user: true
			},
			data: toPostPrisma(post, createdById)
		});

		return Response.json(postSchema.parse(toPostZod(newPost)));
	} else {
		return new Response('', {
			status: 401
		});
	}
};
