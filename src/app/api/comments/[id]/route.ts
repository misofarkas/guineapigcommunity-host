import {commentSchema} from "@/server/zod-schema";
import {db} from "@/server/db";
import {toCommentZod} from "@/server/mappers/comment-mapper";
import {NextRequest} from "next/server";
import {getServerAuthSession} from "@/server/auth";

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const session = await getServerAuthSession();

    if (session != null) {
        const createdById = +(session?.user.id ?? -1);
        const body = await request.json();
        const text = body + '';

        const updatedComment = await db.comment.update({
            include: {
                post: true,
                comment: {
                    include: {
                        user: true,
                    },
                },
                user: true
            },
            where: {
                id: +params.id,
                created_by: createdById
            },
            data: {
                text: text
            }
        });

        return Response.json(commentSchema.parse(toCommentZod(updatedComment)));
    } else {
        return new Response('', {
            status: 401,
        });
    }
};

export const DELETE = async (_: NextRequest, { params }: { params: { id: string } }) => {
    const session = await getServerAuthSession();

    if (session != null) {
        const createdById = +(session?.user.id ?? -1);

        await db.comment.delete({
            where: {
                id: +params.id,
                created_by: createdById
            }
        });

        return Response.json(true);
    } else {
        return new Response('', {
            status: 401,
        });
    }
};

