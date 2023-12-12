import { $Enums } from '.prisma/client';

import vote_type = $Enums.vote_type;

export const toVoteTypePrisma: Record<string, vote_type> = {
	upvote: vote_type.upvote,
	downvote: vote_type.downvote
};

export const toVoteTypeZod: Record<vote_type, string> = {
	[vote_type.upvote]: 'upvote',
	[vote_type.downvote]: 'downvote'
};
