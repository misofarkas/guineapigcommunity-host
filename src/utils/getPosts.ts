import { postMasterSchema } from '@/server/zod-schema';

import { AppendCookies } from './appendCookiesServer';

export const getPosts = async (searchParams: {
	[key: string]: string | string[] | undefined;
}) => {
	const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`);
	Object.entries(searchParams).forEach(([key, value]) => {
		if (value) {
			url.searchParams.append(
				key,
				typeof value === 'string' ? value : value.join(',')
			);
		}
	});

	const res = await fetch(url.toString(), {
		method: 'GET',
		credentials: 'include',
		headers: {
			cookie: AppendCookies()
		},
		cache: 'no-store'
	});

	if (!res.ok) {
		return [];
	}

	const data = await res.json();
	return postMasterSchema.array().parse(data);
};
