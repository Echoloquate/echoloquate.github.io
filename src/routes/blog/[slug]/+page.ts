import { error } from '@sveltejs/kit';

// This load function dynamically imports a single blog post by its slug.
export async function load({ params }) {
	try {
		// import() with a template literal lets Vite resolve the file at build time
		const post = await import(`../../../posts/${params.slug}.md`);

		return {
			content: post.default, // The Svelte component (rendered Markdown)
			metadata: post.metadata  // Frontmatter fields (title, date, tags, etc.)
		};
	} catch {
		error(404, `Post not found: ${params.slug}`);
	}
}
