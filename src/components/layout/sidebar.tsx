import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { libraries } from '@/data/libraries';
import { useProgress } from '@/hooks/use-progress';
import { cn } from '@/lib/utils';
import { BarChart3, ChevronDown, CheckCircle2, Circle, Home, Menu, X, Rocket } from 'lucide-react';
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

	const toggleLib = (id: string) => {
		setExpandedLibs((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	const closeMobile = () => setIsOpen(false);

	const navContent = (
		<div className='h-full flex flex-col w-full md:w-64 bg-card border-r border-border'>
			<div className='p-4 md:p-6 flex items-center space-x-3 border-b border-border'>
				<div className='w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center'>
					<BarChart3 className='text-primary w-5 h-5' />
				</div>
				<span className='font-bold text-lg text-foreground tracking-tight'>Chart Academy</span>
			</div>

			<div className='flex-1 overflow-y-auto py-4'>
				<div className='px-4 mb-4'>
					<Link href='/' onClick={closeMobile} className={cn('flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors', location === '/' ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-secondary hover:text-foreground')}>
						<Home className='w-5 h-5' />
						<span>Բովանդակություն</span>
					</Link>
				</div>

				<div className='space-y-4'>
					{libraries.map((lib) => {
						const isLibActive = location.startsWith(`/library/${lib.id}`);

						return (
							<div key={lib.id} className='px-2'>
								<button onClick={() => toggleLib(lib.id)} className='w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-foreground hover:bg-secondary/50 rounded-lg transition-colors group'>
									<div className='flex items-center space-x-2'>
										<Rocket className={cn('w-4 h-4', lib.logoColor)} />
										<span>{lib.name}</span>
									</div>
									<ChevronDown className={cn('w-4 h-4 text-muted-foreground transition-transform duration-200', expandedLibs[lib.id] ? 'rotate-180' : '')} />
								</button>

								<AnimatePresence initial={false}>
									{expandedLibs[lib.id] && (
										<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className='overflow-hidden'>
											<div className='pt-1 pb-2 space-y-1 ml-4 border-l border-border pl-2 mt-1'>
												<Link href={`/library/${lib.id}`} onClick={closeMobile} className={cn('block px-3 py-1.5 text-sm rounded-md transition-colors', location === `/library/${lib.id}` ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50')}>
													Ներածություն
												</Link>
												{lib.lessons.map((lesson, idx) => {
													const isLessonActive = location === `/lesson/${lib.id}/${lesson.id}`;
													const completed = isCompleted(lib.id, lesson.id);

													return (
														<Link key={lesson.id} href={`/lesson/${lib.id}/${lesson.id}`} onClick={closeMobile} className={cn('flex items-start space-x-2 px-3 py-1.5 text-sm rounded-md transition-colors', isLessonActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50')}>
															<div className='mt-0.5 shrink-0'>{completed ? <CheckCircle2 className='w-4 h-4 text-emerald-500' /> : <Circle className='w-4 h-4 opacity-50' />}</div>
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
	);

	return (
		<>
			<div className='md:hidden flex items-center justify-between p-4 border-b border-border bg-card'>
				<div className='flex items-center space-x-2'>
					<div className='w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center'>
						<BarChart3 className='text-primary w-5 h-5' />
					</div>
					<span className='font-bold text-foreground'>Chart Academy</span>
				</div>
				<button onClick={() => setIsOpen(true)} className='p-2 -mr-2 text-foreground'>
					<Menu className='w-6 h-6' />
				</button>
			</div>

			<AnimatePresence>
				{isOpen && (
					<>
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeMobile} className='fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden' />
						<motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className='fixed inset-y-0 left-0 w-4/5 max-w-75 z-50 md:hidden shadow-2xl'>
							{navContent}
							<button onClick={closeMobile} className='absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground'>
								<X className='w-5 h-5' />
							</button>
						</motion.div>
					</>
				)}
			</AnimatePresence>

			<div className='hidden md:block h-screen sticky top-0 left-0 z-30'>{navContent}</div>
		</>
	);
}
