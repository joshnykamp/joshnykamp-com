# joshnykamp.com — Site Spec & Roadmap

> Last updated: February 2026

---

## 1. Purpose

A personal site for Josh Nykamp — Senior Director of Engineering at DraftKings, travel/landscape photographer, surfer, and mountain biker. The site serves three audiences:

1. **Professional contacts** — recruiters, peers, collaborators looking at resume/career history
2. **Blog readers** — engineers and leaders who find posts via Reddit, Instagram, Threads, or Facebook
3. **Photography followers** — people who follow the travel/landscape work

---

## 2. Current Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Content | MDX via `next-mdx-remote` |
| Frontmatter | `gray-matter` |
| Reading time | `reading-time` |
| Dates | `date-fns` |
| Hosting | TBD (Vercel assumed) |

---

## 3. Design System (Established)

**Palette**
- Background: `stone-950` / `stone-900` / `stone-800`
- Text: `stone-100` / `stone-400` / `stone-500`
- Accent: `gold` (warm yellow) / `gold-light`
- Borders: `stone-700`

**Typography**
- Display / Headings: Playfair Display (serif, black weight)
- Body: DM Sans
- Mono / Labels: DM Mono

**Utility classes**
- `.container-content` — max-w-5xl, centered, padded
- `.heading-display` — Playfair, font-black, tight tracking
- `.label-mono` — DM Mono, xs, uppercase, wide tracking, stone-400
- `.btn-primary` — gold fill button
- `.btn-outline` — bordered ghost button
- `.card` — stone-900 bg, stone-700 border, hover border-stone-500
- `.page-enter` — fade + slide-up animation on mount

---

## 4. Current Pages & Status

### 4.1 Homepage (`/`) ✅ Done (needs headshot + real photos)
- Hero with name/title, tag line, CTA buttons
- Recent blog posts grid (3 cards)
- Photography teaser (4 placeholder squares)
- About snippet with headshot placeholder
- Responsive + mobile hamburger nav

### 4.2 Resume (`/resume`) ⚠️ Scaffold only
- Layout and component structure complete
- **All data is placeholder** — needs real job history, highlights, education
- PDF download link wired but no PDF exists

### 4.3 Blog Index (`/blog`) ✅ Done
- Lists all MDX posts sorted by date
- Uses `PostCard` component
- Empty state shown when no posts

### 4.4 Blog Post (`/blog/[slug]`) ✅ Done
- Full MDX rendering via `next-mdx-remote`
- Per-post OG metadata (title, excerpt, ogImage)
- Twitter card meta
- Share buttons: LinkedIn, Facebook, Threads, Twitter/X, Copy Link
- Static params generated at build time

### 4.5 Contact (`/contact`) ✅ Done
- Links to LinkedIn, Instagram, GitHub, email
- Clean card list layout

### 4.6 Photography (`/photography`) ❌ Not built
- Page linked from nav and homepage, 404s currently

### 4.7 About (`/about`) ❌ Not built
- Linked from homepage, 404s currently

---

## 5. Content System (Established)

Blog posts live as MDX files in `content/posts/`.

**Frontmatter schema:**
```yaml
---
title: "Post Title"
date: "2025-01-15"
excerpt: "One sentence summary shown in cards and OG tags."
category: "Leadership"   # optional
ogImage: "/images/posts/my-post.jpg"  # optional
---
```

One sample post exists: `engineering-leadership-team-not-code.mdx`

---

## 6. What's Missing / Known Gaps

| Item | Notes |
|---|---|
| Resume real data | All `TODO` placeholders, no real job history |
| About page | Linked but doesn't exist |
| Photography page | Linked but doesn't exist |
| Headshot | Placeholder div in homepage |
| Real photos | Photography grid has placeholder squares |
| OG default image | Referenced as `/images/og-default.jpg`, doesn't exist |
| PDF resume | Download link wired, no file |
| Reddit sharing | User wants it, not in `ShareButtons` |
| Instagram sharing | User wants it, not in `ShareButtons` |
| Sitemap | Not generated |
| RSS feed | Not implemented |
| Analytics | Not wired |

---

## 7. Phases & Feature Roadmap

---

### Phase 1 — Fill the Gaps (Content & Data)
*Goal: Make every linked page real. No 404s, no placeholders.*

#### 1.1 Resume — Real Data
- Fill in all job entries with accurate history:
  - DraftKings — Senior Director of Engineering (current)
  - Jackpocket (acquired by DraftKings) — VP of Engineering
  - Weedmaps — Director of Engineering
  - Hustler — Smart TV app development
  - Navy — service history / any relevant tech background
  - Earlier roles (NBC, other positions)
- Add real achievement bullets per role (quantified where possible)
- Add Skills section with real tech stack (Elixir, Node.js, TypeScript, React, etc.)
- Add Education section
- Generate and add PDF version for download
- Add a LinkedIn profile link next to the download button

#### 1.2 About Page (`/about`)
- Bio narrative — the arc from Navy → ActionScript → engineering leadership
- Personal side: Huntington Beach / Ireland split, surfing, mountain biking, photography
- Headshot image
- Links to resume and contact
- Keep it personal in tone — not a LinkedIn page

#### 1.3 Headshot & OG Image
- Add headshot to homepage about section (replace placeholder div)
- Create `/public/images/og-default.jpg` (1200×630) for OG fallback
- Resize/optimize headshot for web

#### 1.4 Share Buttons — Add Reddit & Instagram
- Add **Reddit** share link: `https://www.reddit.com/submit?url={url}&title={title}`
- Add **Instagram** — Instagram doesn't support direct URL sharing; replace with a "Share to Story" or just note to copy link. Best option: show a "Copy for Instagram" button that copies a formatted caption + URL to clipboard.
- Consider reordering: Reddit, Threads, Facebook, Twitter/X, LinkedIn, Copy Link

---

### Phase 2 — Photography
*Goal: Ship a real photography section that showcases travel and landscape work.*

#### 2.1 Photo Data & Storage
- Decide on image hosting: local `/public/photos/`, Cloudinary, or similar CDN
- Define photo metadata schema in `src/types/index.ts` (already has `Photo` type stub):
  ```ts
  interface Photo {
    id: number;
    src: string;
    alt: string;
    collection: string;   // e.g. "ireland", "landscapes", "travel"
    location?: string;    // e.g. "Connemara, Ireland"
    date?: string;
    width: number;
    height: number;
  }
  ```
- Create `src/lib/photos.ts` similar to `posts.ts` — load from a JSON file or MDX

#### 2.2 Photography Index (`/photography`)
- Grid layout — masonry or uniform aspect ratio
- Filter by collection (All / Travel / Landscape)
- Hover state showing location
- Link through to lightbox or individual photo page

#### 2.3 Lightbox
- Click any photo → full-screen lightbox
- Keyboard nav (arrow keys, Escape)
- Show location and date
- Options: `yet-another-react-lightbox` or custom

#### 2.4 Collections / Series
- Group photos into named series (e.g., "Ireland", "American Southwest", "Ocean")
- Collection landing pages at `/photography/[collection]`

#### 2.5 Homepage Photography Teaser
- Replace the 4 placeholder squares with real photos
- Pull from a "featured" flag or first 4 photos

---

### Phase 3 — Blog Polish & Distribution
*Goal: Make the blog a real publishing platform optimized for social sharing.*

#### 3.1 Categories & Filtering
- Blog index gains a category filter bar (All / Leadership / Engineering / Photography / Life)
- URL-based filtering: `/blog?category=leadership`
- Categories defined in MDX frontmatter (already supported)

#### 3.2 Reading Progress
- Thin progress bar at top of post page
- Shows how far through the article the reader is

#### 3.3 Related Posts
- At the bottom of each post, show 2-3 related posts by category
- Simple implementation: same category, exclude current

#### 3.4 RSS Feed
- Generate `/rss.xml` or `/feed.xml` at build time
- Include full post excerpt + link
- Add RSS link in footer and `<head>`

#### 3.5 Dynamic OG Images
- Per-post OG image generated with post title, date, and site branding
- Options: `@vercel/og` / `next/og` for edge-rendered images
- Fallback to static default if no custom image set

#### 3.6 Sitemap
- Auto-generate `sitemap.xml` from all pages + posts
- Use Next.js `app/sitemap.ts` metadata API

#### 3.7 Reddit-Specific Optimization
- Blog posts with clear, direct titles that work as Reddit headlines
- Optional: add a "Post to Reddit" note in share section with recommended subreddit suggestions per category (e.g., r/ExperiencedDevs for leadership posts)

---

### Phase 4 — Engagement & Analytics
*Goal: Understand what's working and build audience.*

#### 4.1 Analytics
- Add privacy-respecting analytics: **Plausible** or **Fathom** (no cookie banner needed)
- Track: page views, referrers, popular posts, share clicks

#### 4.2 Newsletter / Email List
- Add email signup form on blog index and at the bottom of posts
- Options: Buttondown (minimal, developer-friendly), Resend + custom form
- Trigger: "Get notified when I publish" — no spam commitment

#### 4.3 Post Reactions
- Simple emoji reaction bar on posts (👍 ❤️ 🔥 etc.)
- Lightweight — can use a simple API route + Vercel KV or a service like Lyket

#### 4.4 Reading History / "Mark as Read"
- Client-side localStorage tracking
- Show "read" indicator on PostCards in the blog index

---

### Phase 5 — Search & Discovery
*Goal: Make it easy to find older content as the archive grows.*

#### 5.1 Search
- Client-side search using **Fuse.js** over the post index
- Search bar in blog index with keyboard shortcut (Cmd+K or /)
- Results show title, excerpt, category, date

#### 5.2 Tags
- Add `tags` array to post frontmatter
- Tags shown on post page, clickable to filter
- `/blog/tags/[tag]` pages

---

### Phase 6 — Nice-to-Haves
*Stretch goals, revisit after phases 1–4 are shipped.*

| Feature | Notes |
|---|---|
| Dark/light mode toggle | Currently always dark |
| `/uses` page | Tech setup, gear, camera equipment |
| Photography EXIF display | Show camera, lens, settings per photo |
| Guest book / comments | Giscus (GitHub Discussions) or similar |
| `/now` page | Derek Sivers-style "what I'm doing now" |
| Print-optimized resume styles | Clean CSS for `@media print` |
| Structured data (JSON-LD) | Article + Person schema for SEO |

---

## 8. Content Strategy

### Blog Topics (Engineering Leadership focus)
- Org design and team building at scale
- Engineering strategy at DraftKings
- The transition from IC to manager to director
- Hiring — what I look for, how I evaluate
- Incident management and on-call culture
- Smart TV / streaming platform engineering (Hustler era)
- Cannabis tech (Weedmaps era)
- Sports betting at scale (DraftKings)

### Blog Topics (Photography)
- Destination / trip write-ups with photos
- Gear and process
- Ireland travel series
- Ocean / surf photography

### Blog Distribution Targets
- **Reddit**: r/ExperiencedDevs, r/engineering, r/cscareerquestions, r/photography
- **Instagram**: Photography posts, career advice carousels
- **Threads**: Short-form takes, links to posts
- **Facebook**: Personal network, longer shares with excerpts
- **LinkedIn**: Engineering leadership posts only

---

## 9. File Structure Reference

```
joshnykamp-com/
├── content/
│   └── posts/           # MDX blog posts
├── public/
│   ├── images/
│   │   ├── og-default.jpg    # ← needs to be created
│   │   └── posts/            # ← per-post OG images
│   ├── photos/               # ← photography images (or use CDN)
│   └── josh-nykamp-resume.pdf # ← needs to be created
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout, Nav, Footer
│   │   ├── page.tsx           # Homepage
│   │   ├── about/             # ← Phase 1: needs page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── photography/       # ← Phase 2: needs page.tsx
│   │   └── resume/page.tsx
│   ├── components/
│   │   ├── blog/
│   │   │   ├── PostCard.tsx
│   │   │   └── ShareButtons.tsx
│   │   └── layout/
│   │       ├── Nav.tsx
│   │       └── Footer.tsx
│   ├── lib/
│   │   └── posts.ts
│   ├── styles/
│   │   └── globals.css
│   └── types/
│       └── index.ts
└── SPEC.md              # this file
```

---

## 10. Immediate Next Steps (Phase 1 Priority Order)

1. **About page** — write and ship `/about`
2. **Resume data** — fill in all real job history in `resume/page.tsx`
3. **Headshot** — get an image into the repo, replace placeholder
4. **OG image** — create `og-default.jpg`
5. **Share buttons** — add Reddit, adjust Instagram approach
6. **Photography page** — bare minimum grid to remove the 404
7. **PDF resume** — export and add to `/public`
