import { FaRegUser } from 'react-icons/fa';
import { type Metadata } from 'next';

import { getServerAuthSession } from '@/server/auth';
import { AppendCookies } from '@/utils/appendCookiesServer';
import { userSchema } from '@/server/zod-schema';
import { type User } from '@/utils/types';
import UserSettings from '@/components/UserSettings';
import Unauthorized from '@/components/Unauthorized';
import { getUser } from '@/utils/getUser';

export const metadata: Metadata = {
	title: 'Profile'
};

const UserProfile = async ({ params }: { params: { id: string } }) => {
	const userSession = await getServerAuthSession();

	if (!userSession) {
		return <Unauthorized />;
	}

	let user: User | null = null;

	if (userSession?.user) {
		user = await getUser(params.id);
	}

	return (
		<div className="min-h-screen">
			{!user ? (
				<p className="text-xl font-bold">user could not be found</p>
			) : (
				<>
					<div className="mb-4 flex flex-col items-center rounded-lg bg-secondary-bg p-4 shadow-lg">
						{user.image ? (
							// eslint-disable-next-line @next/next/no-img-element
							<img
								src={user.image}
								alt=""
								className="h-32 w-32 rounded-full border border-divider object-cover"
							/>
						) : (
							<FaRegUser className="h-8 w-8" />
						)}
						<h1 className="mt-4 text-xl font-semibold text-primary-text">
							{user.name}
						</h1>
						<p className="text-secondary-text">{user.email}</p>
					</div>
					{/* TODO fix authorized user only edit*/}
					{String(user.id) === String(userSession?.user.id) && (
						<div>
							<UserSettings user={user} />
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default UserProfile;
