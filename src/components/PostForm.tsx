'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { type PostFormSchema, type Post } from '@/utils/types';
import { postFormSchema, tagTypeSchema } from '@/server/zod-schema';
import { convertFileToBase64 } from '@/utils/convertFileToBase64';
import { CookieContext } from '@/app/Providers';

import Tag from './Tag';

const PostForm = ({ prefilledPost }: { prefilledPost?: Post }) => {
	const router = useRouter();
	const cookies = useContext(CookieContext);

	const addPostMutation = useMutation({
		mutationFn: async (post: PostFormSchema) =>
			await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`, {
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
			router.push('/');
		}
	});

	const updatePostMutation = useMutation({
		mutationFn: async (post: PostFormSchema) =>
			await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${prefilledPost?.id}`,
				{
					method: 'PUT',
					body: JSON.stringify(post),
					credentials: 'include',
					headers: {
						cookie: cookies
							.map(cookie => `${cookie.name}=${cookie.value}`)
							.join('; ')
					}
				}
			),
		onSuccess: () => {
			router.push('/');
		}
	});

	const methods = useForm({
		resolver: zodResolver(postFormSchema),
		defaultValues: prefilledPost
	});

	const onSubmit = (post: PostFormSchema) => {
		if (!prefilledPost) {
			addPostMutation.mutate(post);
		} else {
			updatePostMutation.mutate(post);
		}
	};

	const [activeTags, setActiveTags] = useState(
		prefilledPost ? prefilledPost.tags : []
	);
	const [image, setImage] = useState(
		prefilledPost?.image ? prefilledPost.image : undefined
	);
	const imageInput = useRef<HTMLInputElement>(null);

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className="w-full max-w-4xl flex-1 overflow-hidden rounded-lg bg-secondary-bg p-12 shadow-lg"
			>
				<h1 className="text-2xl font-semibold text-primary-text">
					{prefilledPost ? 'Edit a post' : 'Create a new post'}
				</h1>

				<div className="mb-4">
					<label htmlFor="title" className="mb-2 block text-primary-text">
						Title
					</label>
					<input
						{...methods.register('title')}
						className="w-full rounded bg-primary-bg p-2 text-secondary-text"
					/>
					{methods.formState.errors.title && (
						<p role="alert" className="text-error">
							{methods.formState.errors.title.message}
						</p>
					)}
				</div>

				<div className="mb-4">
					<label htmlFor="text" className="mb-2 block">
						Text
					</label>
					<textarea
						{...methods.register('text')}
						rows={4}
						className="w-full rounded bg-primary-bg p-2 text-secondary-text"
					/>
					{methods.formState.errors.text && (
						<p role="alert" className="text-error">
							{methods.formState.errors.text.message}
						</p>
					)}
				</div>

				<div className="mb-4">
					<label htmlFor="tags" className="mb-2 block text-primary-text">
						Tags
					</label>
					<div {...methods.register('tags')} className="space-x-2 space-y-2">
						{tagTypeSchema.options.map(tag => (
							<Tag
								key={tag}
								tagName={tag}
								isActive={activeTags && activeTags.indexOf(tag) !== -1}
								onClick={() => {
									if (activeTags) {
										const newActiveTags =
											activeTags.indexOf(tag) === -1
												? [...activeTags, tag]
												: activeTags.filter(activeTag => activeTag !== tag);
										setActiveTags(newActiveTags);
										methods.setValue('tags', newActiveTags);
									}
								}}
							/>
						))}
					</div>
				</div>

				<div className="mb-4 rounded bg-primary-bg transition ease-in-out">
					<input
						type="file"
						style={{ display: 'none' }}
						{...methods.register('image')}
						accept="image/*"
						ref={imageInput}
						onChange={async e => {
							if (e.target.files?.[0]) {
								try {
									const base64String = await convertFileToBase64(
										e.target.files[0]
									);
									setImage(base64String);
									methods.setValue('image', base64String);
								} catch (error) {
									console.error(error);
								}
							}
						}}
					/>
					<button
						type="button"
						className="w-full rounded border border-divider bg-secondary-bg px-4 py-2 hover:border-secondary-bg hover:bg-hover-bg"
						onClick={() => imageInput.current?.click()}
					>
						Choose image
					</button>
					{image && <p className="flex-1 text-secondary-text">Image chosen.</p>}
				</div>

				<button
					type="submit"
					className="text-l w-full rounded bg-primary-accent px-4 py-2"
				>
					Submit
				</button>
			</form>
		</FormProvider>
	);
};

export default PostForm;
