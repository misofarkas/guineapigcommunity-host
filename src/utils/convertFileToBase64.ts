export const convertFileToBase64 = (file: File): Promise<string> =>
	new Promise((resolve, reject) => {
		if (!file) {
			reject('No file provided');
		}

		const reader = new FileReader();

		reader.onloadend = () => {
			if (typeof reader.result === 'string') {
				resolve(reader.result);
			} else {
				reject('Failed to convert file to base64 string');
			}
		};

		reader.onerror = () => {
			reject('Error occurred while reading file');
		};

		reader.readAsDataURL(file);
	});
