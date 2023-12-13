'use client';

import { useMutation } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { CiBookmark, CiBookmarkCheck } from 'react-icons/ci';

import { CookieContext } from '@/app/Providers';

import LoadingDots from './loadingDots';

const BookmarkButton = ({
	postId,
	isActive
}: {
	postId: number;
	isActive: boolean;
}) => {
	const cookies = useContext(CookieContext);
	const [isBookmarked, setIsBookmarked] = useState(isActive);

	const addBookmarkMutation = useMutation({
		mutationFn: async () =>
			await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${postId}/bookmark`,
				{
					method: 'POST',
					headers: {
						cookie: cookies
							.map(cookie => `${cookie.name}=${cookie.value}`)
							.join('; ')
					}
				}
			),
		onSuccess: data => {
			data.ok && setIsBookmarked(true);
		}
	});

	const removeBookmarkMutation = useMutation({
		mutationFn: async () =>
			await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${postId}/bookmark`,
				{
					method: 'DELETE',
					headers: {
						cookie: cookies
							.map(cookie => `${cookie.name}=${cookie.value}`)
							.join('; ')
					}
				}
			),
		onSuccess: data => {
			data.ok && setIsBookmarked(false);
		}
	});

	return (
		<div className="flex items-center gap-1 rounded border border-divider px-4 py-2 hover:border-secondary-bg hover:bg-primary-bg">
			{addBookmarkMutation.isPending || removeBookmarkMutation.isPending ? (
				<LoadingDots />
			) : (
				<div className="flex items-center gap-1">
					{isBookmarked ? (
						<>
							<CiBookmarkCheck />
							<button
								onClick={() => {
									removeBookmarkMutation.mutate();
								}}
							>
								bookmarked
							</button>
						</>
					) : (
						<>
							<CiBookmark />
							<button
								onClick={() => {
									addBookmarkMutation.mutate();
								}}
							>
								bookmark
							</button>
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default BookmarkButton;
