import Link from 'next/link';

const NavBarLink = ({
	linkTo,
	linkName
}: {
	linkTo: string;
	linkName: string;
}) => (
	<div>
		<Link href={linkTo}>
			<button className="w-full rounded-xl bg-transparent px-4 py-3 text-center text-primary-text transition ease-in-out hover:bg-primary-bg hover:text-white focus:border-primary-accent focus:outline-none">
				{linkName}
			</button>
		</Link>
	</div>
);

export default NavBarLink;
