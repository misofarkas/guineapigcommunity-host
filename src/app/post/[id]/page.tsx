import { postDetailSchema } from '@/server/zod-schema';
import { AppendCookies } from '@/utils/appendCookiesServer';
import Post from '@/components/Post';
import Comment from '@/components/Comment';
import {
	type CommentWithParentCommentId,
	type CommentWithReplies
} from '@/utils/types';

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

const getPost = async (id: string) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${id}`,
		{
			method: 'GET',
			credentials: 'include',
			headers: {
				cookie: AppendCookies()
			}
		}
	);
	const data = await res.json();
	return postDetailSchema.parse(data);
};

const PostPage = async ({ params }: { params: { id: string } }) => {
	const post = await getPost(params.id);
	const comments = commentsToTree(post.comments);

	return (
		<div className="min-h-screen flex-1 bg-primary-bg px-12">
			<Post post={post} />
			{comments.length > 0 && <hr className="my-6 border-t border-gray-600" />}
			<div className="mt-4 flex flex-col gap-4">
				{commentsToTree(post.comments).map(comment => (
					<Comment key={comment.id} parentPost={post} comment={comment} />
				))}
			</div>
		</div>
	);
};

export default PostPage;
