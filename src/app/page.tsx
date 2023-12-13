import { Suspense } from 'react';

import PostFilters from '@/components/PostFilters';
import PostPreview from '@/components/PostPreview';
import PostSkeleton from '@/components/PostSkeleton';
import RightSidebar from '@/components/RightSidebar';
import { getPosts } from '@/utils/getPosts';
import { sortPosts } from '@/utils/sortPosts';

const Home = async ({
	searchParams
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) => {
	const posts = await getPosts(searchParams);
	sortPosts(posts, searchParams);

	return (
		<div className="flex min-h-screen flex-col-reverse lg:flex-row">
			{/* Main Content */}
			<div className="flex-1">
				<div className="bg-primary-bg px-4 sm:px-12">
					<PostFilters />
					<Suspense fallback={<PostSkeleton />}>
						{posts.length !== 0 ? (
							<div className="mt-4 flex flex-col gap-4">
								{posts.map(post => (
									<PostPreview key={post.id} post={post} />
								))}
							</div>
						) : (
							<p className="text-center text-lg font-semibold">
								there are no posts matching your filters
							</p>
						)}
					</Suspense>
				</div>
			</div>

			{/* Right Sidebar */}
			<div className="mb-4 px-4 sm:px-12 lg:mb-0 lg:mt-14 lg:px-0">
				<RightSidebar />
			</div>
		</div>
	);
};

export default Home;
