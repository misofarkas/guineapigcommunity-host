import PostForm from '@/components/PostForm';
import { postDetailSchema } from '@/server/zod-schema';
import { AppendCookies } from '@/utils/appendCookiesServer';

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

const EditPost = async ({ params }: { params: { id: string } }) => {
	const post = await getPost(params.id);

	return (
		<div className="min-h-screen">
			<PostForm prefilledPost={post} />
		</div>
	);
};

export default EditPost;
