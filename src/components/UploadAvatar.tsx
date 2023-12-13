'use client';

import { type Dispatch, type SetStateAction, useRef } from 'react';

import { convertFileToBase64 } from '@/utils/convertFileToBase64';

const UploadAvatar = ({
	setUpdatedUser
}: {
	setUpdatedUser: Dispatch<
		SetStateAction<{
			name: string;
			image: string | null;
			id: number;
			email: string;
		}>
	>;
}) => {
	const fileInput = useRef<HTMLInputElement>(null);
	return (
		<div className="rounded bg-secondary-accent p-2 transition ease-in-out">
			<input
				style={{ display: 'none' }}
				type="file"
				accept="image/*"
				ref={fileInput}
				onChange={async e => {
					if (e.target.files?.[0]) {
						try {
							const base64String = await convertFileToBase64(e.target.files[0]);
							setUpdatedUser(prevState => ({
								...prevState,
								image: base64String
							}));
						} catch (error) {
							console.error(error);
						}
					}
				}}
			/>
			<button className="w-full" onClick={() => fileInput.current?.click()}>
				Select new avatar
			</button>
		</div>
	);
};

export default UploadAvatar;
