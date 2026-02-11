<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { Snippet } from 'svelte';

	// In SvelteKit layouts, `children` is the page content rendered by the router
	let { children }: { children: Snippet } = $props();
</script>

<Nav />

<!-- pt-24 makes room for the fixed floating nav -->
<main class="mx-auto min-h-screen max-w-5xl px-4 pt-24 pb-8">
	{@render children()}
</main>

<Footer />
