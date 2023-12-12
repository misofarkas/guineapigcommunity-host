const PostSkeleton = () => (
	<div className="mx-auto w-full max-w-[600px] animate-pulse overflow-hidden rounded-xl border border-divider bg-secondary-bg">
		<div className="p-8">
			<div className="h-4 w-3/4 rounded bg-gray-400" />
			{/* Simulate Name */}
			<div className="mt-4 h-6 w-1/2 rounded bg-gray-400" />
			{/* Simulate Title */}
			<div className="mt-2 h-4 w-full rounded bg-gray-400" />
			{/* Simulate Text Line 1 */}
			<div className="mt-2 h-4 w-5/6 rounded bg-gray-400" />
			{/* Simulate Text Line 2 */}
		</div>
		<div className="flex items-center gap-x-12 border-t border-divider px-4 py-2">
			<div className="flex items-center space-x-1">
				<div className="h-4 w-4 rounded bg-gray-400" />
				{/* Simulate Upvote Icon */}
				<div className="h-4 w-10 rounded bg-gray-400" />
				{/* Simulate Upvote Count */}
				<div className="h-4 w-4 rounded bg-gray-400" />
				{/* Simulate Downvote Icon */}
			</div>
			<div className="flex items-center gap-1">
				<div className="h-4 w-4 rounded bg-gray-400" />
				{/* Simulate Comment Icon */}
				<div className="h-4 w-16 rounded bg-gray-400" />
				{/* Simulate Comment Count */}
			</div>
			<div className="flex items-center gap-1">
				<div className="h-4 w-4 rounded bg-gray-400" />
				{/* Simulate Bookmark Icon */}
				<div className="h-4 w-20 rounded bg-gray-400" />
				{/* Simulate Bookmark Button */}
			</div>
			<div className="flex-1 text-right">
				<div className="h-4 w-16 rounded bg-gray-400" />
				{/* Simulate Date */}
			</div>
		</div>
	</div>
);

export default PostSkeleton;
