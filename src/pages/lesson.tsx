import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'wouter';
import { getLibrary, getLesson } from '@/data/libraries';
import { useProgress } from '@/hooks/use-progress';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import ReactMarkdown from 'react-markdown';
import { Play, RotateCcw, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

function injectPreviewErrorOverlay(documentHtml: string) {
	const errorScript = `<script>
(() => {
  const renderError = (title, detail) => {
    const mount = () => {
      let node = document.getElementById('__preview_error__');
      if (!node) {
        node = document.createElement('div');
        node.id = '__preview_error__';
        node.style.position = 'fixed';
        node.style.left = '12px';
        node.style.right = '12px';
        node.style.bottom = '12px';
        node.style.zIndex = '2147483647';
        node.style.padding = '12px 14px';
        node.style.borderRadius = '12px';
        node.style.background = 'rgba(127, 29, 29, 0.96)';
        node.style.color = '#fff';
        node.style.fontFamily = 'ui-monospace, SFMono-Regular, Menlo, monospace';
        node.style.fontSize = '12px';
        node.style.lineHeight = '1.5';
        node.style.whiteSpace = 'pre-wrap';
        node.style.boxShadow = '0 10px 30px rgba(0,0,0,0.35)';
        (document.body || document.documentElement).appendChild(node);
      }
      node.textContent = title + '\\n\\n' + detail;
    };

    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', mount, { once: true });
      return;
    }

    mount();
  };

  window.addEventListener('error', (event) => {
    const detail = event.error && event.error.stack
      ? event.error.stack
      : [event.message, event.filename, event.lineno, event.colno].filter(Boolean).join(' | ');
    renderError('Preview error', detail || 'Unknown error');
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const detail = reason && reason.stack ? reason.stack : String(reason);
    renderError('Unhandled promise rejection', detail);
  });
})();
</script>`;

	if (documentHtml.includes('</head>')) {
		return documentHtml.replace('</head>', `${errorScript}</head>`);
	}

	if (documentHtml.includes('<body>')) {
		return documentHtml.replace('<body>', `<body>${errorScript}`);
	}

	return `${errorScript}${documentHtml}`;
}

export default function Lesson() {
	const { libId, lessonId } = useParams<'/lesson/:libId/:lessonId'>();
	const [, setLocation] = useLocation();
	const library = getLibrary(libId || '');
	const lesson = getLesson(libId || '', lessonId || '');
	const { markCompleted, isCompleted } = useProgress();

	const [code, setCode] = useState(() => lesson?.initialCode ?? '');
	const [outputCode, setOutputCode] = useState(() => lesson?.initialCode ?? '');
	const [activeTab, setActiveTab] = useState<'theory' | 'editor' | 'preview'>('editor');

	useEffect(() => {
		if (lesson) {
			setCode(lesson.initialCode);
			setOutputCode(lesson.initialCode);
		}
	}, [lesson]);

	if (!library || !lesson) {
		return <div className='p-8 text-center text-muted-foreground'>Lesson not found</div>;
	}

	const lessonIndex = library.lessons.findIndex((l) => l.id === lesson.id);
	const nextLesson = library.lessons[lessonIndex + 1];
	const prevLesson = library.lessons[lessonIndex - 1];
	const completed = isCompleted(library.id, lesson.id);

	const handleRun = () => {
		setOutputCode(code);
	};

	const handleReset = () => {
		setCode(lesson.initialCode);
		setOutputCode(lesson.initialCode);
	};

	const handleComplete = () => {
		markCompleted(library.id, lesson.id);
		if (nextLesson) {
			setLocation(`/lesson/${library.id}/${nextLesson.id}`);
		} else {
			setLocation(`/library/${library.id}`);
		}
	};

	const previewDocument = injectPreviewErrorOverlay(outputCode);
	const previewKey = `${library.id}-${lesson.id}-${outputCode.length}`;

	return (
		<div className='flex h-full flex-col overflow-hidden bg-background md:flex-row'>
			<div className='md:hidden flex p-2 bg-card border-b border-border space-x-2 shrink-0'>
				{(['theory', 'editor', 'preview'] as const).map((tab) => (
					<button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2 text-sm font-medium rounded-md capitalize transition-colors ${activeTab === tab ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary'}`}>
						{tab}
					</button>
				))}
			</div>

			<div className={`md:flex flex-col w-full md:w-1/3 lg:w-[30%] border-r border-border bg-card overflow-y-auto ${activeTab === 'theory' ? 'flex' : 'hidden'}`}>
				<div className='p-6'>
					<Link href={`/library/${library.id}`} className='inline-flex items-center text-xs text-muted-foreground hover:text-foreground mb-6 font-medium uppercase tracking-wider'>
						<ArrowLeft className='w-3 h-3 mr-1' /> {library.name}
					</Link>

					<h1 className='text-2xl font-bold mb-2 tracking-tight text-foreground'>{lesson.title}</h1>
					<p className='text-muted-foreground mb-8 border-b border-border pb-6'>{lesson.description}</p>

					<div className='prose prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md max-w-none text-sm md:text-base leading-relaxed'>
						<ReactMarkdown>{lesson.theory}</ReactMarkdown>
					</div>
				</div>

				<div className='fixed bottom-0 md:w-1/3 lg:w-[30%] p-6 bg-secondary/30 border-t border-border'>
					<button
						onClick={handleComplete}
						className='w-full py-3 px-4 rounded-xl flex items-center justify-center space-x-2 font-semibold transition-all duration-200 shadow-sm
              bg-linear-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5'
					>
						<span>{nextLesson ? 'Հաջորդ դասը' : 'Ավարտել դասընթացը'}</span>
						{nextLesson ? <ArrowRight className='w-5 h-5' /> : <CheckCircle2 className='w-5 h-5' />}
					</button>
				</div>
			</div>

			<div className={`md:flex flex-col w-full md:w-1/3 lg:w-[35%] border-r border-border bg-background ${activeTab === 'editor' ? 'flex' : 'hidden'}`}>
				<div className='flex items-center justify-between px-4 py-3 bg-card border-b border-border shrink-0'>
					<div className='flex items-center space-x-2'>
						<div className='w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50'></div>
						<div className='w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50'></div>
						<div className='w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50'></div>
						<span className='ml-2 text-xs font-mono text-muted-foreground'>index.html</span>
					</div>
					<div className='flex items-center space-x-2'>
						<button onClick={handleReset} className='p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors tooltip-trigger' title='Reset Code'>
							<RotateCcw className='w-4 h-4' />
						</button>
						<button onClick={handleRun} className='flex items-center space-x-1.5 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors border border-emerald-500/20'>
							<Play className='w-3.5 h-3.5' />
							<span>Run</span>
						</button>
					</div>
				</div>

				<div className='flex-1 overflow-y-auto bg-[#1e1e2e]'>
					<Editor
						value={code}
						onValueChange={setCode}
						highlight={(code) => Prism.highlight(code, Prism.languages.markup, 'markup')}
						padding={16}
						style={{
							fontFamily: 'var(--font-mono)',
							fontSize: 14,
							minHeight: '100%',
							backgroundColor: '#1e1e2e',
						}}
						textareaClassName='focus:outline-none focus:ring-0'
					/>
				</div>
			</div>

			<div className={`md:flex flex-col w-full h-full md:w-1/3 lg:w-[35%] bg-white ${activeTab === 'preview' ? 'flex' : 'hidden'}`}>
				<div className='px-4 py-3 bg-gray-100 border-b border-gray-200 shrink-0 flex items-center space-x-3 text-sm text-gray-500 font-mono'>
					<div className='px-2 py-1 bg-white border border-gray-200 rounded flex-1 flex items-center shadow-sm'>
						<span className='text-gray-400 mr-2'>localhost:3000</span>
					</div>
				</div>
				<div className='flex-1 w-full h-full bg-white relative'>
					<iframe key={previewKey} title='Live Preview' srcDoc={previewDocument} sandbox='allow-scripts allow-modals' className='absolute inset-0 w-full h-full border-none' />
				</div>
			</div>
		</div>
	);
}
