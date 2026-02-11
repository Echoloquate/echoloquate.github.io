---
title: 'Liquid Glass UI With Pure CSS'
date: '2026-02-09'
description: How the frosted glass design on this site works — backdrop-filter, layered transparency, and the tricks that make it not look awful.
tags:
  - css
  - design
  - tutorial
readingTime: 7 min read
published: true
---

# Liquid Glass UI With Pure CSS

Apple's iOS 26 brought "Liquid Glass" into the mainstream — those translucent panels with blur and depth that make everything look like it's floating behind frosted glass. I used it as the design language for this site, and it's surprisingly straightforward to pull off with modern CSS.

## It's basically one property

The whole effect comes down to `backdrop-filter`:

```css
.glass {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
```

`backdrop-filter: blur()` blurs whatever is behind the element. Pair that with a semi-transparent background and you get frosted glass. White-tinted backgrounds give you a light frost; dark tints give you something moodier.

You still need the `-webkit-` prefix for Safari. I keep forgetting this and wondering why it looks wrong on my phone.

## Layer different intensities for depth

One glass panel is flat and boring. The trick is using multiple levels:

```css
.glass-light {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
}

.glass-medium {
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(24px);
}

.glass-heavy {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(40px);
}
```

More opacity + more blur = feels closer to the user. It mimics real glass — thicker glass is less transparent and distorts more. I have three tiers on this site and that's been enough.

## Your background can make or break it

Here's something I didn't think about at first: glass over a white background looks like nothing. Glass over a solid color looks like a tinted overlay. You need something visually interesting behind the glass for the blur to actually matter.

Gradient meshes work great:

```css
body {
  background: #0e0e1a;
  background-image:
    radial-gradient(ellipse at 20% 20%, rgba(110, 80, 200, 0.4) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 10%, rgba(60, 130, 240, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 60% 80%, rgba(180, 60, 200, 0.25) 0%, transparent 50%),
    radial-gradient(ellipse at 10% 70%, rgba(40, 160, 200, 0.2) 0%, transparent 50%);
}
```

Four radial gradients at different positions, different colors, moderate opacity. It gives the glass something to actually diffuse. I went with a dark base because it works better with light text and white-tinted panels.

## Borders and shadows sell it

Without edges, the panels don't look physical:

```css
.glass {
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
}
```

The border is a subtle white line that catches the "light" — like the bright edge on real glass. Keep it 1px and low opacity. The shadow should be soft and diffused (big blur radius, moderate spread) so it feels like the panel is floating, not stamped. And be generous with border-radius. Liquid Glass doesn't do sharp corners — 12px minimum for small stuff, 20px+ for panels.

## Hover states

For interactive glass elements, a small lift on hover goes a long way:

```css
.glass-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}
```

Move it up a few pixels and deepen the shadow. Anything over 4px starts looking overdone.

## Inputs and buttons

Form elements need the glass treatment too, with some adjustments. Inputs should feel recessed (lower opacity, less blur), while buttons feel raised:

```css
.glass-input {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

.glass-input:focus {
  outline: none;
  border-color: #6eb1ff;
}

.glass-button {
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
}

.glass-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
}
```

Focus states swap the border to an accent color instead of adding a glow. Keeps things consistent.

## Watch the performance

`backdrop-filter` is GPU-accelerated, but it's not free. Things I ran into:

- Stacking too many blurred elements kills performance on mobile. Three or four layers is fine. Ten will cause jank.
- Big blur values cost more. 16px is cheap, 80px is not.
- Test on actual phones. I didn't see any issues on desktop but a mid-range Android phone showed frame drops until I dialed back the blur on a couple of elements.

## Browser support

`backdrop-filter` is well-supported in 2026. Chrome, Safari, Firefox, Edge all handle it. For older Android WebViews, you can fall back:

```css
.glass {
  background: rgba(30, 30, 50, 0.9);
}

@supports (backdrop-filter: blur(1px)) {
  .glass {
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(16px);
  }
}
```

Opaque background for browsers that can't blur, full glass for everything else.

## That's the whole system

Five ingredients: semi-transparent backgrounds, backdrop blur, a gradient mesh behind everything, borders and shadows for depth, and generous border-radius. No JavaScript, no canvas, no SVG filters. The entire glass design system for this site is about 90 lines of CSS.
