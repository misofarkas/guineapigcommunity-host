import { type MasterPost } from './types';

export const sortPosts = (
	posts: MasterPost[],
	searchParams: { [key: string]: string | string[] | undefined }
) => {
	switch (searchParams.sort) {
		case 'new':
			posts.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			);
			break;
		case 'popular':
			posts.sort((a, b) => b.voteCount - a.voteCount);
			break;
		default:
			return posts;
	}

	return posts;
};
