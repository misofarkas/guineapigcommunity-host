'use client';

import { signIn } from 'next-auth/react';

const Unauthorized = () => (
	<div className="flex min-h-screen flex-col items-center space-y-4">
		<p className="text-2xl font-bold text-primary-text">
			You are not authorized to access this page
		</p>
		<button
			className="w-[200px] rounded-lg p-2 text-lg font-semibold text-primary-accent transition ease-in-out hover:bg-secondary-bg"
			onClick={() => signIn('discord')}
		>
			sign in to continue
		</button>
	</div>
);

export default Unauthorized;
