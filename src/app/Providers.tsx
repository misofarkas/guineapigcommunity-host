'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { createContext, type ReactNode } from 'react';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
			refetchOnWindowFocus: false,
			staleTime: 3600000
		}
	}
});

export const CookieContext = createContext<{ name: string; value: string }[]>(
	[]
);

export const Providers = ({
	children,
	session,
	cookies
}: {
	children: ReactNode;
	session: Session | null;
	cookies: { name: string; value: string }[];
}) => (
	<SessionProvider session={session}>
		<CookieContext.Provider value={cookies}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</CookieContext.Provider>
	</SessionProvider>
);
