import {bookmark, post, user} from ".prisma/client";
import {toUserZod} from "@/server/mappers/user-mapper";
import {toPostZod} from "@/server/mappers/post-mapper";

export const toBookmarkPrisma = (createdById: number, postId: number) => {
    return {
        created_by: createdById,
        post_id: postId
    };
};

export const toBookmarkZod = (entity: {user: user, post: post} & bookmark) => {
    return {
        createdBy: toUserZod(entity.user),
        post: toPostZod({ user: entity.user, ...entity.post }),
        createdAt: entity.created_at.toString()
    };
};
