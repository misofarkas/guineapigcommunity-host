/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';

import { getUser } from '@/utils/getUser';

export const runtime = 'edge';

export const size = {
	width: 1200,
	height: 630
};

export const contentType = 'image/png';

export const Image = async ({ params }: { params: { id: string } }) => {
	const user = await getUser(params.id);

	if (user === null) {
		return new ImageResponse(
			(
				<div
					style={{
						fontSize: 42,
						background: 'white',
						width: '100%',
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
						padding: 64
					}}
				>
					Profile with id {params.id} not found
				</div>
			)
		);
	}

	return new ImageResponse(
		(
			<div
				style={{
					fontSize: 42,
					background: 'white',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					padding: 128
				}}
			>
				<p>{user.email}</p>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-around',
						width: '100%'
					}}
				>
					{user.image !== null && user.image !== '' && (
						<img
							style={{
								width: '128px',
								height: '128px',
								objectFit: 'cover',
								borderRadius: '100%'
							}}
							src={user.image}
							alt="profile"
						/>
					)}

					<p style={{ fontSize: 72 }}>{user.name}</p>
				</div>
			</div>
		),
		{ ...size }
	);
};

export default Image;
