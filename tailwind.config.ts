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
				'primary-bg': '#1A1A1B',
				'secondary-bg': '#2A2A2B',
				'primary-text': '#D7DADC',
				'secondary-text': '#818384',
				'primary-accent': '#FF4500',
				'secondary-accent': '#0079D3',
				'divider': '#343536',
				'hover-bg': '#48494B',
				'active': '#CC3700',
				'error': '#EA0027',
				'success': '28A745',
				'upvote': '#FF8B60',
				'downvote': '#9494FF'
			}
		}
	},
	plugins: []
};
export default config;
