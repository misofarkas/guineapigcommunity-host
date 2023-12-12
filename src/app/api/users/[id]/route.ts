import {userFormSchema, userSchema} from '@/server/zod-schema';
import {db} from '@/server/db';
import {toUserPrisma, toUserZod} from '@/server/mappers/user-mapper';
import {NextRequest} from "next/server";
import {getServerAuthSession} from "@/server/auth";
import NotFound from "next/dist/client/components/not-found-error";

export const PUT = async (request: NextRequest) => {
	const session = await getServerAuthSession();

	if (session != null) {
		const createdById = +(session?.user.id ?? -1);
		const body = await request.json();
		const user = userFormSchema.parse(body);

		const updatedUser = await db.user.update({
			where: {
				id: createdById
			},
			data: toUserPrisma(user)
		});

		return Response.json(userSchema.parse(toUserZod(updatedUser)));
	} else {
		return new Response('', {
			status: 401,
		});
	}
};

export const GET = async (_: Request, { params }: { params: { id: string } }) => {
	const user = await db.user.findFirst({
		where: {
			id: +params.id
		}
	});

	if (user == null) {
		throw NotFound();
	}

	return Response.json(userSchema.parse(toUserZod(user)));
};

export const DELETE = async (_: NextRequest) => {
	const session = await getServerAuthSession();

	if (session != null) {
		const userId = +(session?.user.id ?? -1);

		await db.user.delete({
			where: {
				id: userId
			}
		});

		return Response.json(true);
	} else {
		return new Response('', {
			status: 401,
		});
	}
};
