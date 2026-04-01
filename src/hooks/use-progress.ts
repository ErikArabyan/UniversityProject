import { useState, useEffect } from 'react';

const PROGRESS_KEY = 'chart_academy_progress';

type ProgressState = Record<string, string[]>;

export function useProgress() {
	const [progress, setProgress] = useState<ProgressState>(() => {
		try {
			const stored = localStorage.getItem(PROGRESS_KEY);
			return stored ? JSON.parse(stored) : {};
		} catch {
			return {};
		}
	});

	useEffect(() => {
		localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
	}, [progress]);

	const markCompleted = (libraryId: string, lessonId: string) => {
		setProgress((prev) => {
			const libProgress = prev[libraryId] || [];
			if (libProgress.includes(lessonId)) return prev;

			return {
				...prev,
				[libraryId]: [...libProgress, lessonId],
			};
		});
	};

	const isCompleted = (libraryId: string, lessonId: string): boolean => {
		return progress[libraryId]?.includes(lessonId) || false;
	};

	const getLibraryProgress = (libraryId: string, totalLessons: number): number => {
		const completed = progress[libraryId]?.length || 0;
		if (totalLessons === 0) return 0;
		return Math.round((completed / totalLessons) * 100);
	};

	const resetProgress = () => {
		setProgress({});
	};

	return {
		progress,
		markCompleted,
		isCompleted,
		getLibraryProgress,
		resetProgress,
	};
}
