import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	// Tailwind plugin must come before SvelteKit
	plugins: [tailwindcss(), sveltekit()]
});
