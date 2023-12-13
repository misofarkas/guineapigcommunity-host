import { postDetailSchema } from '@/server/zod-schema';

import { AppendCookies } from './appendCookiesServer';

export const getPost = async (id: string) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${id}`,
		{
			method: 'GET',
			credentials: 'include',
			headers: {
				cookie: AppendCookies()
			},
			cache: 'no-store'
		}
	);
	const data = await res.json();
	return postDetailSchema.parse(data);
};
