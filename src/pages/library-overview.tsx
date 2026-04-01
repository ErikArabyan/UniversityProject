import { useParams, Link } from 'wouter';
import { getLibrary } from '@/data/libraries';
import { useProgress } from '@/hooks/use-progress';
import { motion } from 'framer-motion';
import { CheckCircle2, Play, BookOpen, ArrowLeft } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function LibraryOverview() {
	const { id } = useParams<'/library/:id'>();
	const library = getLibrary(id || '');
	const { isCompleted, getLibraryProgress } = useProgress();

	if (!library) {
		return <div className='p-8 text-center text-muted-foreground'>Library not found</div>;
	}

	const progress = getLibraryProgress(library.id, library.lessons.length);
	const nextLessonIdx = library.lessons.findIndex((l) => !isCompleted(library.id, l.id));
	const nextLesson = nextLessonIdx >= 0 ? library.lessons[nextLessonIdx] : null;

	const container = {
		hidden: { opacity: 0 },
		show: { opacity: 1, transition: { staggerChildren: 0.05 } },
	};

	const item = {
		hidden: { opacity: 0, x: -20 },
		show: { opacity: 1, x: 0 },
	};

	return (
		<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16'>
			<Link href='/' className='inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors'>
				<ArrowLeft className='w-4 h-4' />
				<span>Վերադառնալ դասընթացներին</span>
			</Link>

			<div className='bg-card border border-border rounded-3xl p-8 md:p-10 mb-12 shadow-sm relative overflow-hidden'>
				<div className='absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3'></div>

				<div className='relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6'>
					<div className='space-y-4 max-w-2xl'>
						<h1 className='text-4xl md:text-5xl font-bold tracking-tight'>{library.name}</h1>
						<p className='text-lg text-muted-foreground leading-relaxed'>{library.description}</p>
						<div className='flex items-center space-x-4 text-sm font-medium text-muted-foreground'>
							<span className='bg-secondary px-3 py-1 rounded-full border border-border'>{library.difficulty}</span>
							<span className='flex items-center space-x-1'>
								<BookOpen className='w-4 h-4' />
								<span>{library.lessons.length} Ինտերակտիվ դասեր</span>
							</span>
						</div>
					</div>

					<div className='shrink-0 w-full md:w-64 bg-secondary/50 rounded-2xl p-5 border border-border'>
						<div className='flex justify-between items-center mb-3'>
							<span className='font-semibold text-sm'>Դասընթացի Առաջընթացը</span>
							<span className='text-primary font-bold'>{progress}%</span>
						</div>
						<Progress value={progress} className='h-2 mb-4' />

						{nextLesson ? (
							<Link href={`/lesson/${library.id}/${nextLesson.id}`} className='w-full flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-xl font-medium transition-colors shadow-sm shadow-primary/20'>
								<Play className='w-4 h-4' />
								<span>{progress === 0 ? 'Սկսել դասընթացը' : 'Շարունակել'}</span>
							</Link>
						) : (
							<div className='w-full flex items-center justify-center space-x-2 bg-emerald-500/20 text-emerald-500 py-2.5 rounded-xl font-medium border border-emerald-500/20'>
								<CheckCircle2 className='w-4 h-4' />
								<span>Completed</span>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className='space-y-6'>
				<h2 className='text-2xl font-bold tracking-tight'>Curriculum</h2>
				<motion.div variants={container} initial='hidden' animate='show' className='space-y-4'>
					{library.lessons.map((lesson, idx) => {
						const completed = isCompleted(library.id, lesson.id);

						return (
							<motion.div key={lesson.id} variants={item}>
								<Link href={`/lesson/${library.id}/${lesson.id}`} className='block group'>
									<div className='flex items-center p-5 bg-card border border-border rounded-2xl hover:border-primary/50 hover:bg-secondary/20 transition-all duration-200'>
										<div className='shrink-0 mr-5'>
											{completed ? (
												<div className='w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20'>
													<CheckCircle2 className='w-5 h-5' />
												</div>
											) : (
												<div className='w-10 h-10 rounded-full bg-secondary text-muted-foreground flex items-center justify-center border border-border group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-colors'>
													<span className='font-semibold'>{idx + 1}</span>
												</div>
											)}
										</div>

										<div className='flex-1'>
											<h3 className='text-lg font-semibold mb-1 group-hover:text-primary transition-colors'>{lesson.title}</h3>
											<p className='text-muted-foreground text-sm'>{lesson.description}</p>
										</div>

										<div className='shrink-0 ml-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-200'>
											<div className='w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center'>
												<Play className='w-4 h-4 ml-0.5' />
											</div>
										</div>
									</div>
								</Link>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</div>
	);
}
