const LoadingDots = () => (
	<div className="flex items-center justify-center space-x-2 bg-transparent dark:invert">
		<span className="sr-only">Loading...</span>
		<div className="h-2 w-2 animate-bounce rounded-full bg-black [animation-delay:-0.3s]" />
		<div className="h-2 w-2 animate-bounce rounded-full bg-black [animation-delay:-0.15s]" />
		<div className="h-2 w-2 animate-bounce rounded-full bg-black" />
	</div>
);

export default LoadingDots;
