import { IoSearchOutline } from 'react-icons/io5';

const Search = ({
	updateQueryParams
}: {
	updateQueryParams: (name: string, value: string, overwrite: boolean) => void;
}) => (
	<div className="flex items-center">
		<IoSearchOutline size={24} className="absolute ml-2 fill-primary-text" />
		<input
			placeholder="Search posts"
			className="w-full flex-1 rounded-2xl border border-divider bg-inherit py-2 pl-10 text-secondary-text"
			onKeyDown={e =>
				e.key === 'Enter' &&
				updateQueryParams('title', e.currentTarget.value, true)
			}
		/>
	</div>
);

export default Search;
