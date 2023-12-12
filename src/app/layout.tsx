import '../globals.css';

import { cookies } from 'next/headers';
import { type Metadata } from 'next';

import TopBar from '@/components/TopBar';
import { getServerAuthSession } from '@/server/auth';

import { Providers } from './Providers';

export const metadata: Metadata = {
	title: {
		template: '%s - GuineaPigCommunity',
		default: 'GuineaPigCommunity'
	},
	description:
		'GuineaPigCommunity is a forum of guinea pig owners sharing their passion for these little creatures'
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await getServerAuthSession();
	const cookieStore = cookies();

	return (
		<html lang="en">
			<body>
				<Providers session={session} cookies={cookieStore.getAll()}>
					<div className="flex flex-col bg-primary-bg text-primary-text">
						{/* Top Bar */}
						<TopBar />

						<div className="mx-auto mb-8 mt-8 max-w-[1600px]">{children}</div>
					</div>
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
