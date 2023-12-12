'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaRegUser } from 'react-icons/fa';
import Link from 'next/link';

import NavBarLink from './NavBarLink';
import SlidingMenu from './SlidingMenu';
import LoadingDots from './loadingDots';

const TopBar = () => {
	const { data, status } = useSession();

	return (
		<div className="bg-secondary-bg p-4 text-lg">
			<div className="mx-auto flex max-w-[1600px] items-center">
				<h1 className="mr-4 hidden text-2xl font-bold lg:inline-block">
					Guinea Pig Community
				</h1>
				<SlidingMenu>
					<NavBarLink linkTo="/" linkName="Home" />
					<NavBarLink linkTo="/bookmarks" linkName="Bookmarks" />
					<NavBarLink linkTo="/history" linkName="Post History" />
				</SlidingMenu>
				<div className="hidden space-x-4 sm:flex">
					<NavBarLink linkTo="/" linkName="Home" />
					<NavBarLink linkTo="/bookmarks" linkName="Bookmarks" />
					<NavBarLink linkTo="/history" linkName="Post History" />
				</div>
				<div className="ml-auto">
					{status === 'loading' && <LoadingDots />}
					{status === 'authenticated' && (
						<div className="flex items-center space-x-4">
							<Link href={`/profile/${data?.user.id}`}>
								<div className=" flex items-center space-x-4 rounded-lg border border-divider p-2 transition ease-in-out hover:bg-primary-bg">
									{data?.user.image ? (
										// eslint-disable-next-line @next/next/no-img-element
										<img
											src={data?.user.image}
											alt="Avatar"
											className="h-8 w-8 rounded-full border border-divider object-cover"
										/>
									) : (
										<FaRegUser className="h-8 w-8" />
									)}

									<p className="font-semibold">{data?.user.name}</p>
								</div>
							</Link>

							<button
								className="rounded-lg bg-primary-accent px-4 py-2 text-white"
								onClick={() => signOut()}
							>
								Sign out
							</button>
						</div>
					)}
					{status === 'unauthenticated' && (
						<button
							className="rounded-xl bg-primary-accent px-4 py-1 text-white"
							onClick={() => signIn('discord')}
						>
							Login
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default TopBar;
