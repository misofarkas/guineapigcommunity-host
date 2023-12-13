'use client';

import { useMutation } from '@tanstack/react-query';
import { IoTrashOutline } from 'react-icons/io5';
import { useContext, useRef, useState } from 'react';

import { CookieContext } from '@/app/Providers';

import LoadingDots from './loadingDots';

const ConfirmDeleteDialog = ({ postId }: { postId: number }) => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [isOpen, setOpen] = useState<boolean>(false);

	const cookies = useContext(CookieContext);

	const deletePostMutation = useMutation({
		mutationFn: async () =>
			await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${postId}`,
				{
					method: 'DELETE',
					credentials: 'include',
					headers: {
						cookie: cookies
							.map(cookie => `${cookie.name}=${cookie.value}`)
							.join('; ')
					}
				}
			),
		onSuccess: data => {
			data.ok && window.location.reload();
		}
	});

	return (
		<div>
			<div
				className={
					isOpen
						? 'fixed inset-0 z-50 bg-secondary-bg bg-opacity-75 transition ease-in-out'
						: ''
				}
			>
				<dialog
					ref={dialogRef}
					className="mt-48 rounded border border-divider bg-primary-bg p-8 text-primary-text"
				>
					<p className=" font-semibold">
						Are you sure you want to delete this post?
					</p>
					<p className="mb-8 text-secondary-text">
						this action is irreversible!
					</p>
					<div className="flex gap-2">
						<button
							className="rounded-lg bg-secondary-bg p-2 transition ease-in-out hover:text-white"
							onClick={() => {
								dialogRef.current?.close();
								setOpen(false);
							}}
						>
							Cancel
						</button>
						{deletePostMutation.isPending ? (
							<LoadingDots />
						) : (
							<button
								className="rounded-lg bg-secondary-bg p-2 transition ease-in-out hover:bg-error hover:text-white"
								onClick={() => {
									deletePostMutation.mutate();
									dialogRef.current?.close();
									setOpen(false);
								}}
							>
								Confirm
							</button>
						)}
					</div>
				</dialog>
			</div>
			<button
				className="rounded-lg p-2 transition ease-in-out hover:bg-error hover:text-white"
				onClick={() => {
					dialogRef.current?.show();
					setOpen(true);
				}}
			>
				<div className="flex items-center gap-1">
					<IoTrashOutline />
					Delete
				</div>
			</button>
		</div>
	);
};

export default ConfirmDeleteDialog;
