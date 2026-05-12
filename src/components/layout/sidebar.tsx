import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { libraries } from '@/data/libraries';
import { useProgress } from '@/hooks/use-progress';
import { cn } from '@/lib/utils';
import { ChevronDown, CheckCircle2, Circle, Home, Menu, Rocket, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Sidebar() {
	const [location] = useLocation();
	const { isCompleted } = useProgress();
	const [isOpen, setIsOpen] = useState(false);
	const [expandedLibs, setExpandedLibs] = useState<Record<string, boolean>>({
		d3js: true,
		chartjs: true,
		highcharts: true,
	});

	useEffect(() => {
		setIsOpen(false);
	}, [location]);

	const toggleLib = (id: string) => {
		setExpandedLibs((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	const closeMenu = () => setIsOpen(false);
	const toggleMenu = () => setIsOpen((prev) => !prev);

	const currentLabel = useMemo(() => {
		if (location === '/') {
			return 'Գլխավոր';
		}

		for (const lib of libraries) {
			if (location === `/library/${lib.id}`) {
				return lib.name;
			}

			const lesson = lib.lessons.find((item) => location === `/lesson/${lib.id}/${item.id}`);

			if (lesson) {
				return `${lib.name} / ${lesson.title}`;
			}
		}

		return 'Navigation';
	}, [location]);

	return (
		<>
			<header className='relative z-40 shrink-0 border-b border-border bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/75'>
				<div className='mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8'>
					<a className='flex min-w-0 items-center gap-3' href='/'>
						<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/20'>
							<img src='/favicon.svg' alt='' />
						</div>
						<div className='min-w-0'>
							<div className='truncate font-semibold tracking-tight text-foreground'>Chart Academy</div>
						</div>
					</a>

					<div className='flex items-center gap-3'>
						<div className='hidden max-w-72 truncate rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground sm:block'>{currentLabel}</div>
						<button onClick={toggleMenu} className='inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-secondary' aria-expanded={isOpen} aria-controls='top-navigation-menu'>
							{isOpen ? <X className='h-4 w-4' /> : <Menu className='h-4 w-4' />}
							<span>{isOpen ? 'Փակել' : 'Մենյու'}</span>
						</button>
					</div>
				</div>
			</header>

			<AnimatePresence>
				{isOpen && (
					<>
						<motion.button type='button' aria-label='Close navigation menu' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeMenu} className='fixed inset-0 z-30 bg-background/70 backdrop-blur-sm' />
						<motion.div initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.2, ease: 'easeOut' }} className='fixed inset-x-0 top-16 z-40 px-4 pb-4 sm:px-6 lg:px-8'>
							<div id='top-navigation-menu' className='mx-auto max-w-screen-2xl overflow-hidden rounded-[28px] border border-border bg-card/95 shadow-2xl shadow-background/30 backdrop-blur'>
								<div className='max-h-[calc(100vh-5.5rem)] overflow-y-auto p-4 sm:p-6'>
									<div className='mb-5 flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between'>
										<div>
											<h2 className='text-lg font-semibold tracking-tight text-foreground'>Ուղեցույց</h2>
											<p className='text-sm text-muted-foreground'>Ընտրեք գրադարանը և անմիջապես անցեք դասին:</p>
										</div>
										<Link href='/' onClick={closeMenu} className={cn('inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors', location === '/' ? 'border-primary/30 bg-primary/10 text-primary' : 'border-border bg-background text-muted-foreground hover:bg-secondary hover:text-foreground')}>
											<Home className='h-4 w-4' />
											<span>Գլխավոր</span>
										</Link>
									</div>

									<div className='grid gap-4 lg:grid-cols-3'>
										{libraries.map((lib) => {
											const isLibActive = location === `/library/${lib.id}` || location.startsWith(`/lesson/${lib.id}/`);

											return (
												<div key={lib.id} className={cn('overflow-hidden rounded-3xl border bg-background/70 transition-colors', isLibActive ? 'border-primary/30 shadow-lg shadow-primary/5' : 'border-border')}>
													<button onClick={() => toggleLib(lib.id)} className='flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-secondary/50'>
														<div className='flex min-w-0 items-center gap-3'>
															<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-card ring-1 ring-border'>
																<Rocket className={cn('h-4 w-4', lib.logoColor)} />
															</div>
															<div className='min-w-0'>
																<div className='truncate font-semibold text-foreground'>{lib.name}</div>
																<div className='truncate text-xs text-muted-foreground'>{lib.lessons.length} Դասընթաց</div>
															</div>
														</div>
														<ChevronDown className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200', expandedLibs[lib.id] ? 'rotate-180' : '')} />
													</button>

													<AnimatePresence initial={false}>
														{expandedLibs[lib.id] && (
															<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className='overflow-hidden border-t border-border'>
																<div className='space-y-2 p-4'>
																	<Link href={`/library/${lib.id}`} onClick={closeMenu} className={cn('block rounded-2xl px-4 py-3 text-sm transition-colors', location === `/library/${lib.id}` ? 'bg-primary/10 text-primary' : 'bg-card text-muted-foreground hover:bg-secondary hover:text-foreground')}>
																		Ներածություն
																	</Link>
																	{lib.lessons.map((lesson, idx) => {
																		const isLessonActive = location === `/lesson/${lib.id}/${lesson.id}`;
																		const completed = isCompleted(lib.id, lesson.id);

																		return (
																			<Link key={lesson.id} href={`/lesson/${lib.id}/${lesson.id}`} onClick={closeMenu} className={cn('flex items-start gap-3 rounded-2xl px-4 py-3 text-sm transition-colors', isLessonActive ? 'bg-primary/10 text-primary' : 'bg-card text-muted-foreground hover:bg-secondary hover:text-foreground')}>
																				<div className='mt-0.5 shrink-0'>{completed ? <CheckCircle2 className='h-4 w-4 text-emerald-500' /> : <Circle className='h-4 w-4 opacity-50' />}</div>
																				<span className='line-clamp-2 leading-tight'>
																					{idx + 1}. {lesson.title}
																				</span>
																			</Link>
																		);
																	})}
																</div>
															</motion.div>
														)}
													</AnimatePresence>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
