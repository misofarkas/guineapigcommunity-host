import { cookies } from 'next/headers';

export const AppendCookies = () => {
	const cookieStore = cookies();

	return cookieStore
		.getAll()
		.map(cookie => `${cookie.name}=${cookie.value}`)
		.join('; ');
};
