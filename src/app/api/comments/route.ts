import {commentFormSchema, commentSchema} from "@/server/zod-schema";
import {db} from "@/server/db";
import {toCommentPrisma, toCommentZod} from "@/server/mappers/comment-mapper";
import {NextRequest} from "next/server";
import {getServerAuthSession} from "@/server/auth";

export const POST = async (request: NextRequest) => {
    const session = await getServerAuthSession();

    if (session != null) {
        const createdById = +(session?.user.id ?? -1);
        const body = await request.json();
        const comment = commentFormSchema.parse(body);

        const newComment = await db.comment.create({
            include: {
                post: true,
                comment: {
                    include: {
                        user: true,
                    },
                },
                user: true
            },
            data: toCommentPrisma(comment, createdById)
        });

        return Response.json(commentSchema.parse(toCommentZod(newComment)));
    } else {
        return new Response('', {
            status: 401,
        });
    }
};
