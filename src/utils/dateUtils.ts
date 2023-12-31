export const formatDate = (date: string) => {
	const inputDate = new Date(date);
	const currentDate = new Date();

	const diffInSeconds = Math.floor(
		(currentDate.getTime() - inputDate.getTime()) / 1000
	);

	if (diffInSeconds < 60) {
		return 'just now';
	} else if (diffInSeconds < 3600) {
		return `${Math.floor(diffInSeconds / 60)} minutes ago`;
	} else if (diffInSeconds < 86400) {
		return `${Math.floor(diffInSeconds / 3600)} hours ago`;
	} else {
		return `${Math.floor(diffInSeconds / 86400)} days ago`;
	}
};
