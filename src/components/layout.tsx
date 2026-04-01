import { ReactNode } from 'react';
import { Sidebar } from './layout/sidebar';

export function Layout({ children }: { children: ReactNode }) {
	return (
		<div className='flex h-screen flex-col bg-background text-foreground overflow-hidden'>
			<Sidebar />
			<main className='relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden focus:outline-none'>{children}</main>
		</div>
	);
}
