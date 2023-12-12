'use client';
import { useSearchParams } from 'next/navigation';

import Tag from './Tag';

const SelectTags = ({
	updateQueryParams
}: {
	updateQueryParams: (name: string, value: string, overwrite: boolean) => void;
}) => {
	const searchParams = useSearchParams();

	return (
		<div className="flex w-full items-center">
			<div className="whitespace-nowrap pr-6 font-semibold lg:pr-2">
				Select tags
			</div>
			<div className="space-x-2 space-y-2">
				<div />
				<Tag
					tagName="Pigtures"
					isActive={searchParams.has('tag', 'Pigtures')}
					onClick={() => updateQueryParams('tag', 'Pigtures', false)}
				/>
				<Tag
					tagName="New Pigs on the Block"
					isActive={searchParams.has('tag', 'New Pigs on the Block')}
					onClick={() =>
						updateQueryParams('tag', 'New Pigs on the Block', false)
					}
				/>
				<Tag
					tagName="Health & Diet"
					isActive={searchParams.has('tag', 'Health & Diet')}
					onClick={() => updateQueryParams('tag', 'Health & Diet', false)}
				/>
				<Tag
					tagName="Housing"
					isActive={searchParams.has('tag', 'Housing')}
					onClick={() => updateQueryParams('tag', 'Housing', false)}
				/>
			</div>
		</div>
	);
};

export default SelectTags;
