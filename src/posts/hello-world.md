---
title: Hello World
date: '2026-02-08'
description: First post. Testing the blog setup and making sure code blocks don't look terrible.
tags:
  - meta
  - svelte
readingTime: 2 min read
published: true
---

# Hello World

First post, so I'm mostly just making sure the plumbing works — mdsvex processes the markdown, Shiki highlights the code, and nothing catches fire.

Here's a Svelte 5 component to see if syntax highlighting holds up:

```svelte
<script lang="ts">
  let count = $state(0);
  let doubled = $derived(count * 2);
</script>

<button onclick={() => count++}>
  Count: {count} (doubled: {doubled})
</button>
```

And some TypeScript:

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

And the glass CSS this site uses:

```css
.glass {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
```

Everything renders. Ship it.
