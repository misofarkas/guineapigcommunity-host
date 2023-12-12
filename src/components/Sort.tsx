'use client';

import { useSearchParams } from 'next/navigation';

const Sort = ({
	updateQueryParams
}: {
	updateQueryParams: (name: string, value: string, overwrite: boolean) => void;
}) => {
	const searchParams = useSearchParams();

	return (
		<div className="flex items-center gap-2 rounded-2xl border border-divider bg-secondary-bg p-2">
			<p className="font-semibold">Sort by</p>
			<button
				className={`rounded-lg border border-divider px-3  py-1 transition ease-in-out ${
					searchParams.has('sort', 'new')
						? 'bg-primary-accent'
						: 'hover:bg-primary-bg'
				}`}
				onClick={() => updateQueryParams('sort', 'new', true)}
			>
				New
			</button>
			<button
				className={`rounded-lg border border-divider px-3  py-1 transition ease-in-out ${
					searchParams.has('sort', 'popular')
						? 'bg-primary-accent'
						: 'hover:bg-primary-bg'
				}`}
				onClick={() => updateQueryParams('sort', 'popular', true)}
			>
				Popular
			</button>
		</div>
	);
};

export default Sort;
