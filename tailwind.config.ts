import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			colors: {
				'primary-bg': '#FFF0E0', // Creamy Peach
				'secondary-bg': '#FFDAB9', // Off White Peach
				'primary-text': '#4B3832', // Dark Brown
				'secondary-text': '#854442', // Soft Brown
				'primary-accent': '#E6A57E', // Soft Coral
				'secondary-accent': '#FAD2B2', // Pastel Blue
				'divider': '#D3C1BC', // Light Grayish Brown
				'hover-bg': '#FAD2B2', // Light Coral
				'active': '#FFB482', // Peachy Orange
				'error': '#FF6B6B', // Soft Red
				'success': '#77DD77', // Pastel Green
				'upvote': '#F9B5AC', // Soft Pink
				'downvote': '#AEC6CF' // Pastel Blue (same as secondary-accent)
			}
		}
	},
	plugins: []
};
export default config;
