'use client';

import { type PropsWithChildren, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';

const SlidingMenu = ({ children }: PropsWithChildren) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<button
				className="inline-block rounded-lg bg-primary-bg p-2 sm:hidden"
				onClick={() => setIsOpen(!isOpen)}
			>
				<GiHamburgerMenu />
			</button>
			<div
				className={`fixed left-0 top-0 z-10 h-full w-60 bg-secondary-bg p-4 duration-300 ease-in-out ${
					isOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				<button
					className="rounded-lg bg-primary-bg p-2"
					onClick={() => setIsOpen(!isOpen)}
				>
					<IoMdClose />
				</button>
				<div className="mt-10">{children} </div>
			</div>
		</div>
	);
};

export default SlidingMenu;
