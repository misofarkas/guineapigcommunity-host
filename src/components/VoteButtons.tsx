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
	const [localVoteCount, setLocalVoteCount] = useState(voteCount);
	const [localVoteType, setLocalVoteType] = useState<string | null>(() => {
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
			if (data.ok) {
				setLocalVoteType(voteType);
				voteType === 'upvote'
					? setLocalVoteCount(localVoteCount + (localVoteType ? 2 : 1))
					: setLocalVoteCount(localVoteCount - (localVoteType ? 2 : 1));
			}
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
			if (data.ok) {
				setLocalVoteType(null);
				localVoteType === 'upvote'
					? setLocalVoteCount(localVoteCount - 1)
					: setLocalVoteCount(localVoteCount + 1);
			}
		}
	});

	return (
		<div className="flex items-center space-x-1">
			<button
				onClick={() => {
					if (localVoteType === 'upvote') {
						deleteVoteMutation.mutate();
					} else {
						setVoteMutation.mutate('upvote');
					}
				}}
			>
				<FaArrowUp
					className={`h-4 w-4 transition ease-in-out hover:text-primary-accent ${
						localVoteType === 'upvote' && 'text-upvote'
					}`}
				/>
			</button>
			<span>{localVoteCount}</span>
			<button
				onClick={() => {
					if (localVoteType === 'downvote') {
						deleteVoteMutation.mutate();
					} else {
						setVoteMutation.mutate('downvote');
					}
				}}
			>
				<FaArrowDown
					className={`h-4 w-4 transition ease-in-out hover:text-secondary-accent ${
						localVoteType === 'downvote' && 'text-downvote'
					}`}
				/>
			</button>
		</div>
	);
};

export default VoteButtons;
