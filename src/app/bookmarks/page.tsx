import { type Metadata } from 'next';

import PostSquished from '@/components/PostSquished';
import Unauthorized from '@/components/Unauthorized';
import { getServerAuthSession } from '@/server/auth';
import { getPosts } from '@/utils/getPosts';

export const metadata: Metadata = {
	title: 'Bookmarks'
};

const Bookmarks = async () => {
	const userSession = await getServerAuthSession();
	const posts = await getPosts({ bookmark: 'true' });
	if (!userSession) {
		return <Unauthorized />;
	}

	return (
		<div className="min-h-screen">
			{posts.length !== 0 ? (
				<>
					{posts.map(post => (
						<PostSquished key={post.id} post={post} canEdit={false} />
					))}
				</>
			) : (
				<p className="text-center text-lg font-semibold">No posts bookmarked</p>
			)}
		</div>
	);
};

export default Bookmarks;
