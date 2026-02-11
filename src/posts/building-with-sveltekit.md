---
title: What I Learned Building My First SvelteKit Site
date: '2026-02-10'
description: Notes from picking up SvelteKit and Svelte 5 with no prior Svelte experience.
tags:
  - svelte
  - sveltekit
  - web dev
readingTime: 6 min read
published: true
---

# What I Learned Building My First SvelteKit Site

I picked SvelteKit for this portfolio site specifically because I hadn't used it before. I learn best by building something real, and a portfolio site felt like the right scope — enough pages and features to hit the rough edges, not so big that I'd abandon it.

## Runes took a minute to click

Coming from React, I kept reaching for patterns that don't exist here. There's no `useState` setter, no `useEffect` dependency array. Svelte 5 runes are different at a fundamental level — the compiler wires up reactivity at build time instead of tracking it at runtime.

```svelte
<script lang="ts">
  // $state creates a reactive variable — just assign to it, no setter
  let count = $state(0);

  // $derived tracks its dependencies automatically
  let message = $derived(
    count === 0 ? 'Click to start' : 'Clicked ' + count + ' times'
  );

  // $effect also auto-tracks — no dependency array
  $effect(() => {
    console.log('Count is now: ' + count);
  });
</script>

<button onclick={() => count++}>
  {message}
</button>
```

The lack of a dependency array tripped me up at first. I kept looking for where to declare dependencies and then realized... you don't. The compiler figures out what you read and tracks it. No stale closures, no forgotten deps. Once that clicked, it felt like a lot of ceremony I was used to just wasn't needed here.

## File-based routing, but with a trick

The filesystem-as-router thing is straightforward — `src/routes/blog/+page.svelte` becomes `/blog`, brackets for dynamic segments. Nothing surprising.

But the `+page.ts` load functions are where it gets interesting:

```typescript
// This runs before the page renders — server-side during SSR,
// or at build time if you're prerendering
export async function load() {
  const postFiles = import.meta.glob('/src/posts/*.md', { eager: true });

  const posts = Object.entries(postFiles).map(([path, module]) => {
    const slug = path.split('/').pop()!.replace('.md', '');
    const { metadata } = module as { metadata: BlogPost };
    return { ...metadata, slug };
  });

  return { posts };
}
```

Same load function handles SSR, prerendering, and client-side navigation. I didn't have to learn three patterns for three deployment modes. That was a relief.

## mdsvex just works

I went with [mdsvex](https://mdsvex.pngwn.io/) for the blog. Write Markdown files with frontmatter, and they become Svelte components. Paired it with Shiki for syntax highlighting, and the whole blog setup took maybe half an hour.

No CMS to configure, no MDX compatibility issues to fight with, no build plugin rabbit holes. I wrote a `.md` file, dropped it in the posts folder, and it showed up. That's the kind of DX I want.

## The layout system is nice

SvelteKit's `+layout.svelte` wraps all pages in its directory:

```svelte
<script lang="ts">
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<Nav />
<main>{@render children()}</main>
<Footer />
```

Nav and footer on every page, no wrapper components, no context providers. Layouts cascade through nested directories too, so you can add sub-layouts for sections of your site without duplicating anything.

## Things I'd do differently

**Don't extract components too early.** I made a few "reusable" components that turned out to be used exactly once. Should have waited for actual repetition before abstracting.

**Read the SvelteKit docs first.** I spent time searching for answers to things that were covered clearly in the official guide. The docs are good — better than most frameworks I've used. I just didn't read them thoroughly enough up front.

**TypeScript from the start** was the right call though. Svelte 5's type inference with `$props()` caught bugs before I ever opened the browser. No regrets there.

## Would I use it again?

Yeah. SvelteKit gets out of your way more than any other framework I've tried. The compiler handles the busywork, the conventions make sense, and I spent most of my time building the actual site instead of fighting tooling. If you've been meaning to try Svelte, just pick a project and go.
