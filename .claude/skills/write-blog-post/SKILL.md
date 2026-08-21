---
name: write-blog-post
description: Draft a new blog post for joshnykamp.com and its LinkedIn/Instagram captions. Use when Josh asks to write, draft, or outline a blog post, or to write a LinkedIn/Instagram caption for an existing post. Triggers include "write a blog post about X", "draft a post on X", "help me write about X", "write a LinkedIn caption for this post", "draft an Instagram caption".
---

# write-blog-post

Helps draft a new post for the `content/posts/` MDX blog and, once approved,
the LinkedIn/Instagram captions for it. This skill only writes files — it
never calls any social API itself. Publishing/cross-posting is a separate,
human-triggered step: `npm run social:publish` (see
`docs/social-publishing.md`).

## Voice & style

Calibrate against `content/posts/engineering-leadership-team-not-code.mdx` —
the one existing post, and the clearest signal of Josh's voice:

- First-person, engineering-leadership perspective (Josh is a Senior
  Director of Engineering; prior VP/Director roles at Jackpocket/DraftKings
  and Weedmaps).
- Short, punchy declarative sentences mixed with occasional longer
  explanatory ones. Not academic, not listicle-breezy.
- Section headers are insight statements ("From Maker to Multiplier"), not
  generic labels ("Introduction", "Conclusion").
- Bolded one-line theses inside paragraphs work well for key takeaways.
- Ends with a short aside rather than a summary paragraph.
- Site design is dark stone + gold accent, Playfair Display headings — the
  writing should feel considered and a little understated, not hype-y.

## Frontmatter contract

Match `src/types/index.ts` (`PostMeta`) and `src/lib/posts.ts`
(`parsePost`) exactly — do not invent fields that don't exist there.

```yaml
---
title: "..."
date: "YYYY-MM-DD"
excerpt: "1-2 sentences — doubles as the meta description and the seed for auto-generated captions."
category: "..."
---
```

- **No `slug` field** — the slug is the filename itself. Derive a kebab-case
  filename from the title (e.g. `content/posts/why-x-matters.mdx`).
- **No `tags` field** — doesn't exist in this schema.
- **No draft/published flag** — a post is live the moment the `.mdx` file
  exists in `content/posts/`. Don't create the file until Josh has approved
  the draft.
- `category`: reuse an existing one when the topic fits (currently just
  `"Leadership"` is in use; `"Engineering"` is the coded default) — ask
  before inventing a new category rather than assuming one.
- Optional fields, only set if there's a real reason to: `ogImage` (path
  under `/public/images/...`), `linkedinText`, `instagramCaption` (hand-tuned
  overrides — see below).

## MDX body

Start directly with prose/content at `##` — do **not** repeat the title as
an `# H1` in the body. The page template (`src/app/blog/[slug]/page.tsx`)
already renders `post.title` in its own heading above the content.

## Workflow

1. If the topic/angle is underspecified, ask 1–2 clarifying questions
   (angle, audience, roughly how long) — don't over-interview.
2. Draft the MDX body first, then the frontmatter.
3. Check `content/posts/` for a filename collision before saving; save to
   `content/posts/<kebab-slug>.mdx`.
4. Show Josh the draft and let him request edits before treating it as
   final.
5. Once approved, draft the two captions:
   - **LinkedIn**: a short hook line plus 1–3 sentences of substance. Do
     **not** paste the raw URL — `npm run social:publish` attaches the link
     as a LinkedIn article card automatically, so a pasted link reads as
     redundant/spammy.
   - **Instagram**: similar tone, but must end with a spelled-out call to
     action (e.g. "Full post: joshnykamp.com/blog/... — link in bio").
     Instagram captions aren't clickable, so this isn't optional.
6. Offer to save the approved captions into the post's `linkedinText` /
   `instagramCaption` frontmatter fields (only if Josh wants to hand-tune
   rather than let them regenerate from the excerpt at publish time).
7. Tell Josh the concrete next step: deploy the post, then run
   `npm run social:publish -- <slug> --linkedin --instagram` (suggest
   `--dry-run` first to preview). Cross-posting only works once the post
   (and its image) are live in production — Instagram fetches the image
   from the real `joshnykamp.com` URL.

## Reference files

- `content/posts/engineering-leadership-team-not-code.mdx` — voice/style example
- `src/types/index.ts` — exact frontmatter/`PostMeta` shape
- `scripts/publish-social.ts` — the publishing CLI this hands off to
- `docs/social-publishing.md` — one-time platform setup, for context if asked
