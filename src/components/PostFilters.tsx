'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import Search from './Search';
import Sort from './Sort';
import SelectTags from './SelectTags';

const PostFilters = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const updateQueryParams = useCallback(
		(name: string, value: string, overwrite: boolean) => {
			const params = new URLSearchParams(searchParams);
			if (overwrite) {
				if (value === '') {
					params.delete(name);
				} else {
					params.set(name, value);
				}
			} else {
				if (searchParams.has(name, value)) {
					params.delete(name, value);
				} else {
					params.append(name, value);
				}
			}

			router.push(`${pathname}?${params.toString()}`);
		},
		[pathname, router, searchParams]
	);

	return (
		<div className="space-y-3 pb-4">
			<Search updateQueryParams={updateQueryParams} />
			<Sort updateQueryParams={updateQueryParams} />
			<SelectTags updateQueryParams={updateQueryParams} />
			<button
				className="w-full rounded-lg bg-primary-accent p-2 font-semibold"
				onClick={() => router.replace('/')}
			>
				Reset filters
			</button>
		</div>
	);
};

export default PostFilters;
