import { userSchema } from '@/server/zod-schema';

import { AppendCookies } from './appendCookiesServer';

export const getUser = async (id: string) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${id}`,
		{
			method: 'GET',
			credentials: 'include',
			headers: {
				cookie: AppendCookies()
			}
		}
	);
	if (!res.ok) {
		return null;
	}
	const data = await res.json();
	return userSchema.parse(data);
};
