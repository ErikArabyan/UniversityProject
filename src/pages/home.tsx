import { libraries } from '@/data/libraries';
import { useProgress } from '@/hooks/use-progress';
import { Link } from 'wouter';
import { motion, type Variants } from 'framer-motion';
import { BookOpen, Code2, LineChart, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function Home() {
	const { getLibraryProgress } = useProgress();

	const container: Variants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: { staggerChildren: 0.1 },
		},
	};

	const item: Variants = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
	};

	return (
		<div className='min-h-screen pb-20'>
			<div className='relative overflow-hidden bg-card border-b border-border'>
				<div className='absolute inset-0 opacity-20 mix-blend-screen pointer-events-none'>
					<img src={'images/hero-bg.png'} alt='Hero background pattern' className='w-full h-full object-cover' />
					<div className='absolute inset-0 bg-linear-to-b from-transparent to-card'></div>
				</div>

				<div className='relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28'>
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='text-center max-w-3xl mx-auto space-y-6'>
						<div className='inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20'>
							<Star className='w-4 h-4' />
							<span>Ինտերակտիվ ուսուցման հարթակ</span>
						</div>
						<h1 className='text-4xl md:text-6xl font-bold tracking-tight text-foreground'>
							Սովորիր JavaScript <br />
							<span className='text-transparent bg-clip-text bg-linear-to-r from-primary to-indigo-400'>Տվյալների վիզուալիզացիա</span>
						</h1>
						<p className='text-lg md:text-xl text-muted-foreground leading-relaxed'>Սովորիր D3.js, Chart.js և Highcharts անմիջապես Ձեր բրաուզերում։ Գրեք կոդ, անմիջապես ստացեք արդյունքներ և Կառուցեք Գեղեցիկ գծապատկերներ:</p>
					</motion.div>
				</div>
			</div>

			<div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16'>
				<div className='flex items-center space-x-3 mb-8'>
					<BookOpen className='text-primary w-6 h-6' />
					<h2 className='text-2xl font-bold'>Հասանելի Դասընթացներ</h2>
				</div>

				<motion.div variants={container} initial='hidden' animate='show' className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{libraries.map((lib) => {
						const progress = getLibraryProgress(lib.id, lib.lessons.length);

						return (
							<motion.div key={lib.id} variants={item}>
								<Link href={`/library/${lib.id}`} className='block h-full group'>
									<div className='h-full bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300 flex flex-col relative overflow-hidden'>
										<div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-full pointer-events-none z-0`} />

										<div className='relative z-10'>
											<div className='flex justify-between items-start mb-4'>
												<div className='w-12 h-12 rounded-xl bg-secondary flex items-center justify-center border border-border group-hover:bg-primary/10 transition-colors'>
													<LineChart className={`w-6 h-6 ${lib.logoColor}`} />
												</div>
												<span className='text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-muted-foreground border border-border'>{lib.difficulty}</span>
											</div>

											<h3 className='text-xl font-bold mb-2 group-hover:text-primary transition-colors'>{lib.name}</h3>
											<p className='text-muted-foreground text-sm mb-6 grow'>{lib.description}</p>

											<div className='mt-auto space-y-4'>
												<div className='flex items-center justify-between text-sm'>
													<span className='text-muted-foreground flex items-center gap-1.5'>
														<Code2 className='w-4 h-4' />
														{lib.lessons.length} Դասեր
													</span>
													<span className='font-medium text-foreground'>{progress}%</span>
												</div>
												<Progress value={progress} className='h-1.5' />
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
