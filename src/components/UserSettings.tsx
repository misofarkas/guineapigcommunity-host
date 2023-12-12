/* eslint-disable @next/next/no-img-element */
'use client';

import { useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { CookieContext } from '@/app/Providers';
import { type User } from '@/utils/types';

import UploadAvatar from './UploadAvatar';

const UserSettings = ({ user }: { user: User }) => {
	const cookies = useContext(CookieContext);
	const [updatedUser, setUpdatedUser] = useState(user);

	const uploadSettingsMutation = useMutation({
		mutationFn: async () =>
			await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${user.id}`,
				{
					method: 'PUT',
					headers: {
						cookie: cookies
							.map(cookie => `${cookie.name}=${cookie.value}`)
							.join('; ')
					},
					body: JSON.stringify(updatedUser)
				}
			),
		onSuccess: data => {
			data.ok && window.location.reload();
		}
	});

	return (
		<div className="space-y-4 rounded border border-divider p-2 font-semibold">
			<p>Change profile settings</p>
			<input
				placeholder="change name"
				className="w-full rounded border border-divider bg-primary-bg p-2 font-normal text-primary-text"
				onChange={e =>
					setUpdatedUser(prevState => ({
						...prevState,
						name: e.target.value
					}))
				}
			/>
			<div className="flex items-center gap-4">
				<img
					src={updatedUser.image ?? ''}
					alt=""
					className="h-32 w-32 rounded-full border border-divider object-cover"
				/>
				<UploadAvatar setUpdatedUser={setUpdatedUser} />
			</div>
			<button
				className="w-full rounded bg-secondary-bg p-2 transition ease-in-out hover:bg-hover-bg"
				onClick={() => uploadSettingsMutation.mutate()}
			>
				{uploadSettingsMutation.isPending
					? 'Saving changes...'
					: 'Save changes'}
			</button>
		</div>
	);
};

export default UserSettings;
