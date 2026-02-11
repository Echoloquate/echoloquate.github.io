import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import { createHighlighter } from 'shiki';

// Create a Shiki highlighter instance (cached after first call)
const highlighter = await createHighlighter({
	themes: ['github-dark'],
	langs: ['javascript', 'typescript', 'svelte', 'html', 'css', 'bash', 'json']
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Tell SvelteKit to also treat .md files as pages
	extensions: ['.svelte', '.md'],

	// mdsvex preprocessor turns Markdown into Svelte components
	preprocess: [
		mdsvex({
			extensions: ['.md'],
			highlight: {
				highlighter: (code, lang) => {
					// Shiki returns HTML with inline styles for syntax colors
					return `{@html \`${highlighter.codeToHtml(code, { lang: lang || 'text', theme: 'github-dark' })}\`}`;
				}
			}
		})
	],

	kit: {
		adapter: adapter()
	}
};

export default config;
