# joshnykamp.com

Personal website for Josh Nykamp — Senior Director of Engineering at DraftKings and amateur travel/landscape photographer.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Blog**: MDX via `next-mdx-remote`
- **Photography**: `yet-another-react-lightbox`
- **Hosting**: Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding Blog Posts

Create a `.mdx` file in `/content/posts/`:

```mdx
---
title: "Your Post Title"
date: "2024-02-01"
excerpt: "A short description shown in cards and Open Graph previews."
category: "Leadership"
---

Your content here...
```

## Adding Photos

1. Add optimized images to `/public/images/photography/`
2. Update the `photos` array in `src/app/photography/page.tsx`

## Deployment

Push to `main` → Vercel auto-deploys.

```bash
git add .
git commit -m "your message"
git push
```
