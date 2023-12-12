import { FaReply } from 'react-icons/fa';
import { BiHide } from 'react-icons/bi';
import { useMutation } from '@tanstack/react-query';
import router from 'next/router';
import { useContext } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import {
	type CommentFormSchema,
	type CommentWithReplies,
	type Post
} from '@/utils/types';
import { CookieContext } from '@/app/Providers';
import { commentFormSchema } from '@/server/zod-schema';

// const convertCommentWithRepliesToComment = (
// 	post: Post,
// 	commentWithReplies: CommentWithReplies
// ) => {
// 	const entity = {
// 		...commentWithReplies,
// 		comment: { ...commentWithReplies, user: post.createdBy },
// 		post,
// 		user: { ...post.createdBy, name: post.createdBy.name }
// 	};
// 	return toCommentZod(entity);
// };

const Reply = ({
	post,
	comment,
	onHide
}: {
	post: Post;
	comment?: CommentWithReplies;
	onHide: () => void;
}) => {
	const cookies = useContext(CookieContext);

	const addCommentMutation = useMutation({
		mutationFn: async (post: CommentFormSchema) =>
			await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/comments`, {
				method: 'POST',
				body: JSON.stringify(post),
				credentials: 'include',
				headers: {
					cookie: cookies
						.map(cookie => `${cookie.name}=${cookie.value}`)
						.join('; ')
				}
			}),
		onSuccess: () => {
			onHide();
			router.push('/');
		}
	});

	const methods = useForm({
		resolver: zodResolver(commentFormSchema),
		defaultValues: {
			text: '',
			parentPost: post
		}
	});

	const onSubmit = (comment: CommentFormSchema) =>
		addCommentMutation.mutate(comment);

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className="mt-4 w-full max-w-[800px] overflow-hidden rounded-lg bg-secondary-bg p-4 text-sm text-secondary-text shadow-lg"
			>
				<textarea
					rows={4}
					{...methods.register('text')}
					className="flex w-full items-center gap-1 rounded border border-divider bg-secondary-bg p-2 px-4 py-2 text-white"
					placeholder="Write a reply..."
				/>
				{methods.formState.errors.text && (
					<p role="alert" className="py-1 text-sm text-secondary-text">
						{methods.formState.errors.text.message}
					</p>
				)}
				<div className="flex justify-end">
					<div className="ml-2 mt-2 flex items-center gap-1 rounded border border-divider px-4 py-2 hover:border-secondary-bg hover:bg-primary-bg">
						<BiHide />
						<button type="button" onClick={() => onHide()}>
							hide
						</button>
					</div>
					<div className="ml-2 mt-2 flex items-center gap-1 rounded border border-divider px-4 py-2 hover:border-secondary-bg hover:bg-primary-bg">
						<FaReply />
						<button type="submit">reply</button>
					</div>
				</div>
			</form>
		</FormProvider>
	);
};

export default Reply;
