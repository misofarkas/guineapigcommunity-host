import { useMutation } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

import { CookieContext } from '@/app/Providers';

const VoteButtons = ({
	postId,
	voteCount,
	isUpvoted,
	isDownvoted
}: {
	postId: number;
	voteCount: number;
	isUpvoted: boolean;
	isDownvoted: boolean;
}) => {
	const cookies = useContext(CookieContext);
	const [voteType, setVoteType] = useState<string | null>(() => {
		if (isUpvoted) return 'upvote';
		if (isDownvoted) return 'downvote';
		return null;
	});

	const setVoteMutation = useMutation({
		mutationFn: async (vote: string) =>
			await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${postId}/vote?voteType=${vote}`,
				{
					method: 'PUT',
					headers: {
						cookie: cookies
							.map(cookie => `${cookie.name}=${cookie.value}`)
							.join('; ')
					}
				}
			),
		onSuccess: (data, variables) => {
			const voteType = variables;
			data.ok && setVoteType(voteType);
			console.log('add vote data.ok: ', data.ok, variables);
		}
	});

	const deleteVoteMutation = useMutation({
		mutationFn: async () =>
			await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${postId}/vote`,
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
			data.ok && setVoteType(null);
			console.log('remove vote data.ok: ', data.ok);
		}
	});

	return (
		<div className="flex items-center space-x-1">
			<button
				onClick={() => {
					if (voteType === 'upvote') {
						deleteVoteMutation.mutate();
					} else {
						setVoteMutation.mutate('upvote');
					}
				}}
			>
				<FaArrowUp
					className={`h-4 w-4 transition ease-in-out hover:text-primary-accent ${
						voteType === 'upvote' && 'text-upvote'
					}`}
				/>
			</button>
			<span>{voteCount}</span>
			<button
				onClick={() => {
					if (voteType === 'downvote') {
						deleteVoteMutation.mutate();
					} else {
						setVoteMutation.mutate('downvote');
					}
				}}
			>
				<FaArrowDown
					className={`h-4 w-4 transition ease-in-out hover:text-secondary-accent ${
						voteType === 'downvote' && 'text-downvote'
					}`}
				/>
			</button>
		</div>
	);
};

export default VoteButtons;
