import type { BlogPost } from '$lib/types';

// This load function runs on the server (or during prerendering) before the page renders.
// It uses import.meta.glob to find all .md files in src/posts/ and extract their metadata.
export async function load() {
	const postFiles = import.meta.glob('/src/posts/*.md', { eager: true });

	const posts: BlogPost[] = Object.entries(postFiles).map(([path, module]) => {
		// Extract slug from file path: "/src/posts/hello-world.md" → "hello-world"
		const slug = path.split('/').pop()!.replace('.md', '');
		const { metadata } = module as { metadata: Omit<BlogPost, 'slug'> };

		return { ...metadata, slug };
	});

	// Sort by date (newest first), filter to only published posts
	const published = posts
		.filter((p) => p.published !== false)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return { posts: published };
}
