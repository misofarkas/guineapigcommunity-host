import {
	type bookmark,
	type comment,
	type post,
	type user,
	type vote_post
} from '.prisma/client';

export type PostMasterPrisma = post & {
	user: user;
	bookmark: bookmark[];
	vote_post: vote_post[];
	comment: comment[];
};
