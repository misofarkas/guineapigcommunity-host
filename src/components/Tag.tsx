const Tag = ({
	tagName,
	isActive,
	onClick
}: {
	tagName: string;
	isActive?: boolean;
	onClick?: () => void;
}) => (
	<button
		type="button"
		onClick={() => {
			if (onClick) onClick();
		}}
		className={`border border-divider transition ease-in-out hover:bg-primary-accent ${
			isActive ? ' bg-primary-accent' : 'hover:bg-primary-bg'
		} inline-block rounded-full  p-2 text-primary-text`}
	>
		{tagName}
	</button>
);

export default Tag;
