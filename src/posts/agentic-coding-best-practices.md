---
title: "Agentic Coding: What Actually Worked for Me"
date: "2026-02-11"
description: I built this site with an AI coding agent. Some of it went great, some of it didn't. Here's what I'd tell someone about to try it.
tags:
  - ai
  - workflow
  - best practices
readingTime: 8 min read
published: true
---

# Agentic Coding: What Actually Worked for Me

I built this portfolio site with an AI coding agent — not just the boilerplate, the whole thing. Planning, scaffolding, implementation, debugging, deployment. It was a useful experiment and I came out of it with some opinions.

## It's not autocomplete

The thing that separates agentic coding from Copilot-style autocomplete is that the agent takes multi-step actions. It reads your files, makes a plan, writes code across multiple files, runs the build, sees errors, and fixes them. It's a loop, not a one-shot prediction.

That loop is powerful when it works. When it doesn't, it can waste a lot of your time confidently going in the wrong direction. The skill is knowing when to let it run and when to interrupt.

## Write a spec first, or you'll regret it

The biggest lever on output quality is how clearly you define what you want before the agent starts writing code. I tried both ways. "Build me a portfolio site" gets you something generic and bland. A spec that nails down pages, tech stack, design direction, and conventions gets you something you might actually keep.

My process ended up being:

1. Back-and-forth conversation to figure out what I wanted
2. A concrete spec document with pages, features, and tech decisions
3. A `CLAUDE.md` file so the agent has project context in every session
4. Plan mode — agent reads everything, proposes an approach, I approve or push back
5. Then it actually writes code

Skipping steps 1-3 is tempting. Don't.

## Plan mode is the move

The pattern that worked best was: agent proposes a plan, I review it, then it executes. This caught misunderstandings before any code was written, which is where you want to catch them.

Without plan mode, I'd get 200 lines into an implementation and realize the agent had made a wrong assumption about the project structure three files ago. Rolling that back is annoying. Reading a plan and saying "no, not like that" takes ten seconds.

## Context files are high leverage

The `CLAUDE.md` file — a project context file the agent reads at the start of every session — ended up being one of the most valuable pieces of the whole setup. Mine has the tech stack, coding conventions, project structure, and one line that turned out to matter a lot: "The user is learning Svelte for the first time."

That one line changed how the agent wrote code. More comments, simpler patterns, explanations of Svelte-specific idioms. Without it, the code was technically fine but harder for me to follow.

## You still have to review everything

This is the part people don't want to hear. The agent produces code that looks right and often is right, but "often" isn't "always." I caught issues by:

- Reading diffs instead of just looking at the result. The agent will sometimes "fix" something by quietly removing functionality.
- Running `npm run check` and `npm run build` after every change. Type errors and build failures catch a whole category of problems.
- Watching for over-engineering. The agent loves creating abstractions. It'll build a utility function for something that happens once, or add error handling for situations that can't occur. I pushed back on this a lot.
- Checking API usage against docs. The agent sometimes uses function signatures that don't exist in the version of the library you're using. TypeScript catches most of these, but not all.

## Keep sessions short

Long sessions degrade. The agent's context window fills up with old information, and it starts making references to things it changed three iterations ago. I got better results from focused sessions — one clear goal per session, with the context file carrying forward what matters.

## Where this is heading

I think agentic coding is going to change how most software gets built. But right now, the developers who get the most out of it are the ones who bring strong opinions about what good code looks like. The agent is fast, but it has no taste. Your job is to supply the taste and the direction.

The goal isn't to remove yourself from the process. It's to spend your time on design and architecture instead of typing out boilerplate.
