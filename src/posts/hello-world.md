---
title: Hello World
date: '2026-02-11'
description: My first blog post — testing mdsvex and Shiki syntax highlighting.
tags:
  - meta
  - svelte
readingTime: 2 min read
published: true
---

# Hello World

Welcome to my blog! This is a test post to verify that **mdsvex** and **Shiki** syntax highlighting are working correctly.

## Why SvelteKit?

SvelteKit is a full-stack framework that makes building web apps a joy. Here's a quick example of a Svelte 5 component using runes:

```svelte
<script lang="ts">
  // $state creates reactive state
  let count = $state(0);

  // $derived auto-updates when count changes
  let doubled = $derived(count * 2);
</script>

<button onclick={() => count++}>
  Count: {count} (doubled: {doubled})
</button>
```

## Code Highlighting

Shiki provides VS Code-quality syntax highlighting. Here's some TypeScript:

```typescript
interface BlogPost {
  title: string;
  date: string;
  tags: string[];
  published: boolean;
}

function getLatestPosts(posts: BlogPost[]): BlogPost[] {
  return posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
```

And some CSS with the glass effect:

```css
.glass {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
```

That's it for now. More posts coming soon!
