import { useParams, Link } from 'wouter';
import { getLibrary } from '@/data/libraries';
import { useProgress } from '@/hooks/use-progress';
import { motion } from 'framer-motion';
import { CheckCircle2, Play, BookOpen, ArrowLeft, ChevronDown, Terminal, Video } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type LibraryCodeStep = {
	title: string;
	explanation: string;
	code: string;
};

type LibraryGuide = {
	summary: string;
	steps: LibraryCodeStep[];
};

type LibraryVideo = {
	title: string;
	src: string;
};

const libraryVideos: Record<string, LibraryVideo> = {
	d3js: {
		title: 'D3.js ուսուցողական տեսանյութ',
		src: 'lessons/D3js.mp4',
	},
	chartjs: {
		title: 'Chart.js ուսուցողական տեսանյութ',
		src: 'lessons/chartjs.mp4',
	},
	highcharts: {
		title: 'Highcharts ուսուցողական տեսանյութ',
		src: 'lessons/highcharts.mp4',
	},
};

const libraryGuides: Record<string, LibraryGuide> = {
	highcharts: {
		summary: 'Դուք միացնում եք Highcharts գրադարանը, ստեղծում եք կոնտեյներ և նկարագրում եք գրաֆիկը կարգավորումների օբյեկտի կողմից:',
		steps: [
			{
				title: 'Միացնում ենք գրադարանը',
				explanation: 'Այս script-ը ավելացնում է Highcharts գլոբալ օբյեկտ, որի միջոցով ստեղծվում են բոլոր գրաֆիկները:',
				code: `<script src="https://cdn.jsdelivr.net/npm/highcharts/highcharts.js"></script>`,
			},
			{
				title: 'Ստեղծում ենք կոնտեյներ',
				explanation: 'Highcharts-ին անհրաժեշտ է սովորական HTML տարր: Դրա մեջ գրադարանը կտեղադրի պատրաստի SVG գրաֆիկը:',
				code: `<div id="container"></div>`,
			},
			{
				title: 'Ինչպես կիրառել',
				explanation: 'Առաջին արգումենտը կոնտեյների id-ն է, երկրորդը՝ գրաֆիկի պարամետրերով օբյեկտ:',
				code: `Highcharts.chart('container', {
	// գրաֆիկի կարգավորումներ
});`,
			},
			{
				title: 'Սահմանեք տեսակը և վերնագիրը',
				explanation: 'chart.type-ը սահմանում է գրաֆիկի տեսակը, իսկ title.text-ը վերևից ցույց է տալիս վերնագիրը:',
				code: `chart: { type: 'line' },
title: { text: 'Sales by month' },`,
			},
			{
				title: 'Կարգավորում ենք առանցքները',
				explanation: 'xAxis-ը սահմանում է հորիզոնական տվյալները, yAxis-ը բացատրում է, թե ինչ արժեքներ են ցուցադրվում ուղղահայաց սահմանները:',
				code: `xAxis: { categories: ['Jan', 'Feb', 'Mar'] },
yAxis: { title: { text: 'Sales' } },`,
			},
			{
				title: 'Փոխանցում ենք տվյալները',
				explanation: 'series-ը տվյալների հավաքածուների զանգված է: Յուրաքանչյուր օբյեկտ դառնում է առանձին տող, սյունակ կամ Հատված:',
				code: `series: [{
  name: 'Sales',
  data: [12, 19, 7]
}]`,
			},
		],
	},
	chartjs: {
		summary: 'Chart.js-ը գծապատկերներ է կառուցում canvas-ի վրա: Դուք ստեղծում եք canvas, ընտրում եք տեսակը, փոխանցում տվյալները և անհրաժեշտության դեպքում ավելացնում ընտրանքներ:',
		steps: [
			{
				title: 'Միացնում ենք Chart.js-ը',
				explanation: 'CDN ֆայլը ավելացնում է Chart class-ը, որի միջոցով ստեղծվում է նոր գրաֆիկ:',
				code: `<script src="https://cdn.jsdelivr.net/npm/chart.js/dist/chart.umd.min.js"></script>`,
			},
			{
				title: 'Ավելացնում ենք canvas',
				explanation: 'Chart.js-ը նկարում է canvas-ի ներսում, ուստի այս տարրը գրաֆիկի տեղն է:',
				code: `<canvas id="myChart"></canvas>`,
			},
			{
				title: 'վերցնում ենք canvas-ը DOM-ից։',
				explanation: 'Տարրի հղումը փոխանցվում է գրադարանին, որպեսզի այն իմանա որտեղ պետք է նկարել գրաֆիկը։',
				code: `const ctx = document.getElementById('myChart');`,
			},
			{
				title: 'Ստեղծում ենք գրաֆիկ և ընտրում ենք տեսակը',
				explanation: 'type определяет форму визуализации: bar, line, pie, doughnut и другие.',
				code: `new Chart(ctx, {
  type: 'bar',
});`,
			},
			{
				title: 'Նկարագրում ենք գրաֆիկի նշանակությունը',
				explanation: 'labels-ը ինֆորմացիան է առանցքի վրա, datasets-ը մեկ կամ մի քանի թվեր են ցուցադրելու համար:',
				code: `data: {
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [{
    label: 'Sales',
    data: [12, 19, 7]
  }]
},`,
			},
			{
				title: 'Ավելացնում ենք կարգավորումներ',
				explanation: 'options-ը կառավարում է չափսերը, հուշումները, tooltip-ը, առանցքները, ցանցը և այլ դետալներ:',
				code: `options: {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' }
  }
}`,
			},
		],
	},
	d3js: {
		summary: 'D3.js-ը գրաֆիկ ստեղծելու համար օգտագործում է SVG-ներ։',
		steps: [
			{
				title: 'միացնում ենք D3.js-ը',
				explanation: 'Այս սկրիպտը ավելացնում է D3 օբյեկտը իր ֆունկցիաներով՝ տարրեր, մասշտաբներ, առանցքներ ընտրելու և տվյալների հետ աշխատելու համար:',
				code: `<script src="https://d3js.org/d3.v7.min.js"></script>`,
			},
			{
				title: 'Ստեղծել SVG',
				explanation: 'Քանի որ D3-ը նկարում է SVG-ում, պետք է ստեղծել svg կոնտեյներ նրա մեջ գրաֆիկը նկարելու համար և տալ նրան id ատրիբուտ։',
				code: `<svg id="chart" width="400" height="260"></svg>`,
			},
			{
				title: 'Ընտրում ենք SVG տարրը',
				explanation: 'd3.select գտնում է տարրը էջում: Դրանից հետո Դրան կարող եք գրաֆիկներ տալ:',
				code: `const svg = d3.select('#chart');`,
			},
			{
				title: 'Տալիս ենք տվյալներ և Չափեր',
				explanation: 'data զանգվածը գրաֆիկի աղբյուրն է: Չափերը անհրաժեշտ են տարրերի դիրքը ճիշտ հաշվարկելու համար:',
				code: `const data = [20, 60, 90];
const width = 400;
const height = 260;`,
			},
			{
				title: 'Ստեղծեք սանդղակ',
				explanation: 'Սանդղակը տվյալների իրական արժեքները վերածում է պիքսելների, որպեսզի թվերը դառնան լայնություն կամ կոորդինատներ:',
				code: `const xScale = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, width - 80]);`,
			},
			{
				title: 'Տվյալները կապում ենք պատկերների հետ',
				explanation: 'data-ի տվյալները կապում ենք գրաֆիկին, enter-ը ստեղծում է բացակայող rect-ը, append-ը դրանք ավելացնում է SVG-ին:',
				code: `svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', 40)
  .attr('y', (d, i) => i * 36 + 24)
  .attr('width', (d) => xScale(d))
  .attr('height', 24);`,
			},
			{
				title: 'Ավելացնել առանցք',
				explanation: 'axisBottom-ը ստեղծում է մասշտաբի տվյալները, իսկ call-ը պատրաստի առանցքը կիրառում է G խմբի վրա:',
				code: `const axis = d3.axisBottom(xScale);

svg.append('g')
  .attr('transform', 'translate(40, 140)')
  .call(axis);`,
			},
		],
	},
};

function getPublicAssetPath(assetPath: string) {
	const baseUrl = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

	return `${baseUrl}${assetPath.replace(/^\/+/, '')}`;
}

function LibraryVideoBlock({ libraryName, video }: { libraryName: string; video: LibraryVideo }) {
	return (
		<section className='mb-12 overflow-hidden rounded-3xl border border-border bg-card shadow-sm'>
			<div className='flex items-center gap-3 border-b border-border p-5 md:p-6'>
				<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary'>
					<Video className='h-5 w-5' />
				</div>
				<div className='min-w-0'>
					<p className='text-xs font-semibold uppercase text-primary'>Տեսանյութ</p>
					<h2 className='mt-1 truncate text-2xl font-bold'>{video.title}</h2>
				</div>
			</div>

			<div className='bg-background p-3 md:p-4'>
				<div className='aspect-video overflow-hidden rounded-2xl border border-border bg-black'>
					<video className='h-full w-full object-contain' controls preload='metadata' playsInline aria-label={`${libraryName} ուսուցողական տեսանյութ`}>
						<source src={getPublicAssetPath(video.src)} type='video/mp4' />
					</video>
				</div>
			</div>
		</section>
	);
}

function LibraryGuideDropdown({ guide }: { guide: LibraryGuide }) {
	return (
		<details className='group mb-12 overflow-hidden rounded-2xl border border-border bg-card shadow-sm'>
			<summary className='flex cursor-pointer list-none items-center justify-between gap-4 p-5 transition-colors hover:bg-secondary/30 [&::-webkit-details-marker]:hidden'>
				<div className='flex items-start gap-3'>
					<div className='mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary'>
						<Terminal className='h-5 w-5' />
					</div>
					<div>
						<h2 className='text-xl font-bold tracking-tight'>Օգտագործման հիմնական կետերը</h2>
						<p className='mt-1 text-sm leading-relaxed text-muted-foreground'>{guide.summary}</p>
					</div>
				</div>
				<ChevronDown className='h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180' />
			</summary>

			<div className='border-t border-border p-5 md:p-6'>
				<ol className='space-y-5'>
					{guide.steps.map((step, index) => (
						<li key={step.title} className='rounded-xl border border-border bg-background/40 p-4'>
							<div className='mb-3 flex gap-3'>
								<span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary'>{index + 1}</span>
								<div>
									<h3 className='font-semibold tracking-tight'>{step.title}</h3>
									<p className='mt-1 text-sm leading-relaxed text-muted-foreground'>{step.explanation}</p>
								</div>
							</div>
							<pre className='overflow-x-auto rounded-xl border border-border bg-background p-4 text-sm text-foreground'>
								<code>{step.code}</code>
							</pre>
						</li>
					))}
				</ol>
			</div>
		</details>
	);
}

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
	const guide = libraryGuides[library.id];
	const video = libraryVideos[library.id];

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

			{video ? <LibraryVideoBlock libraryName={library.name} video={video} /> : null}

			{guide ? <LibraryGuideDropdown guide={guide} /> : null}

			<div className='space-y-6'>
				<h2 className='text-2xl font-bold tracking-tight'>Ուսումնական պլան</h2>
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
