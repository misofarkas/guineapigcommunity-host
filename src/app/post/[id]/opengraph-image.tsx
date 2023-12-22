import { ImageResponse } from 'next/og';

import { getPost } from '@/utils/getPost';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
	width: 1200,
	height: 630
};

export const contentType = 'image/png';

// Image generation
const Image = async ({ params }: { params: { id: string } }) => {
	const post = await getPost(params.id);

	if (post === null) {
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
					Post with id {params.id} not found
				</div>
			)
		);
	}

	return new ImageResponse(
		(
			<div
				style={{
					fontSize: 42,
					background: 'black',
					color: 'white',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-around',
					flexDirection: 'column',
					padding: '5%',
					fontFamily: 'cursive'
				}}
			>
				<h1 style={{ fontSize: 72 }}>{post.title}</h1>
				<p>{post.text}</p>
				<span
					style={{
						justifyContent: 'space-between',
						width: '100%',
						fontSize: 36
					}}
				>
					<p>Likes: {post.upvoters.length - post.downvoters.length}</p>
					<p>Comments: {post.comments.length}</p>
					<p>Created by: {post.createdBy.name}</p>
				</span>
			</div>
		),
		{ ...size }
	);
};

export default Image;
