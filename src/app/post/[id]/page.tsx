import Post from '@/components/Post';
import Comment from '@/components/Comment';
import {
	type CommentWithParentCommentId,
	type CommentWithReplies
} from '@/utils/types';
import { getPost } from '@/utils/getPost';

export const generateMetadata = async ({
	params
}: {
	params: { id: string };
}) => {
	const post = await getPost(params.id);
	if (!post) return null;
	return {
		title: post.title,
		createdBy: post.createdBy.name,
		comments: post.comments.length,
		votes: post.upvoters.length - post.downvoters.length
	};
};

const commentsToTree = (comments: CommentWithParentCommentId[]) => {
	const commentMap: { [id: number]: CommentWithReplies } = {};
	comments.forEach(comment => {
		commentMap[comment.id] = { ...comment, replies: [] };
	});

	comments.forEach(comment => {
		if (comment.parentCommentId) {
			commentMap[comment.parentCommentId].replies?.push(commentMap[comment.id]);
		}
	});

	return comments
		.filter(comment => !comment.parentCommentId)
		.map(comment => commentMap[comment.id]);
};

const PostPage = async ({ params }: { params: { id: string } }) => {
	const post = await getPost(params.id);

	return (
		<div className="min-h-screen flex-1 bg-primary-bg px-12">
			{!post ? (
				<p className="text-xl font-bold">post could not be found</p>
			) : (
				<>
					<Post post={post} />
					<div className="mt-4 flex flex-col gap-4 py-8">
						{commentsToTree(post.comments).map(comment => (
							<Comment key={comment.id} parentPost={post} comment={comment} />
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default PostPage;
