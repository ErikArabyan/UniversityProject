import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const port = 4050;
const basePath = '/';
const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	base: basePath,
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@': path.resolve(rootDir, 'src'),
		},
		dedupe: ['react', 'react-dom'],
	},
	root: path.resolve(rootDir),
	build: {
		outDir: path.resolve(rootDir, 'dist/public'),
		emptyOutDir: true,
	},
	server: {
		port,
		host: '0.0.0.0',
		allowedHosts: true,
		fs: {
			strict: true,
			deny: ['**/.*'],
		},
	},
	preview: {
		port,
		host: '0.0.0.0',
		allowedHosts: true,
	},
});
