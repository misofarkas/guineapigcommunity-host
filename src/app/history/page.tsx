import { type Metadata } from 'next';

import PostSquished from '@/components/PostSquished';
import Unauthorized from '@/components/Unauthorized';
import { getServerAuthSession } from '@/server/auth';
import { getPosts } from '@/utils/getPosts';

export const metadata: Metadata = {
	title: 'History'
};

const History = async () => {
	const userSession = await getServerAuthSession();
	const posts = await getPosts({ history: 'true' });

	if (!userSession) {
		return <Unauthorized />;
	}

	return (
		<div className="min-h-screen">
			{posts.length !== 0 ? (
				<>
					{posts.map(post => (
						<PostSquished key={post.id} post={post} canEdit />
					))}
				</>
			) : (
				<p className="text-center text-lg font-semibold">No posts in history</p>
			)}
		</div>
	);
};

export default History;
