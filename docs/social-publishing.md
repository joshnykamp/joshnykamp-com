# Cross-posting blog posts to LinkedIn & Instagram

This site can cross-post a published blog entry to LinkedIn and Instagram via
`npm run social:publish`. Setup for each platform is a one-time, mostly
manual process (creating developer apps isn't scriptable) — do this once,
then the day-to-day flow is just running the publish command.

Only LinkedIn and Instagram are supported. YouTube has no API for posting a
text/link update from a blog. TikTok's Content Posting API only allows
public auto-publish for apps that pass Content Disclosure / audit review,
and this site has no video content to post anyway — both are left as future
work (`src/lib/social/` is designed so adding either later doesn't require
touching what's already here).

## LinkedIn

1. Go to the [LinkedIn Developer Portal](https://www.linkedin.com/developers/apps)
   and create an app. LinkedIn requires it be associated with a **Company
   Page** — if you don't already have one, create a minimal one first (it
   doesn't need to be your "main" page).
2. Under the app's **Products** tab, request access to:
   - **Share on LinkedIn** (posting)
   - **Sign In with LinkedIn using OpenID Connect** (used to resolve your
     own member id — no extra scopes/review needed)
   Both are self-serve for posting on your own behalf.
3. Under **Auth**, add `http://localhost:8765/callback` as an authorized
   redirect URL.
4. Copy the app's **Client ID** and **Client Secret**.
5. Run `npm run social:auth:linkedin` — it'll prompt for the Client
   ID/Secret (only the first time; they're then saved to `.env.local`),
   open your browser to authorize, and write the resulting access token to
   `.env.local`.

**Token lifetime:** LinkedIn access tokens on this tier last ~60 days and
**LinkedIn does not issue a refresh token** for this product — there is no
way to renew without a browser step. `npm run social:publish` will tell you
when the token is expired or about to expire; when that happens, just
re-run `npm run social:auth:linkedin`.

## Instagram

1. Make sure your Instagram account is a **Professional (Business or
   Creator)** account, linked to a **Facebook Page** you manage.
2. Go to [Meta for Developers](https://developers.facebook.com/apps) and
   create an app (type: **Business**). Add the **Instagram Graph API**
   product.
3. Make sure you're listed as an admin/tester on the app and on the linked
   Facebook Page — as the app's own developer/tester, publishing to your own
   linked account works in the app's default Development Mode, without
   submitting for Meta App Review.
4. Under **App settings → Basic**, add `http://localhost:8766/callback` as
   a valid OAuth redirect URI, and copy the **App ID** and **App Secret**.
5. Run `npm run social:auth:instagram` — it'll prompt for the App ID/Secret
   (saved to `.env.local` after the first run), open your browser to
   authorize, resolve your linked Instagram Business Account, and write the
   resulting tokens to `.env.local`.

**Token lifetime:** the long-lived user token lasts ~60 days, but — unlike
LinkedIn — it can be silently renewed without a browser step, as long as you
do it before it fully expires: run `npm run social:refresh:instagram`
periodically (once a month is a safe cadence). If it does fully lapse,
you'll need to run `npm run social:auth:instagram` again.

**Image requirement:** Instagram posts always need an image — there's no
text/link-only post type. The publisher uses the post's `ogImage`
frontmatter field, falling back to the site default
(`public/images/og-default.jpg`). Meta fetches this image server-side from
your live production URL, so `--instagram` only works **after the post is
deployed**, not from a local/uncommitted branch.

**Captions aren't clickable on Instagram** — the generated caption spells
out the blog URL and says "link in bio" rather than relying on a tappable
link.

## Publishing

```
npm run social:publish -- <slug> --linkedin --instagram
npm run social:publish -- <slug> --linkedin --dry-run   # preview without posting
```

At least one of `--linkedin`/`--instagram` must be passed explicitly — there
is no "publish to everything" default, since there's no draft/published
flag or publish history in this repo to guard against posting the same
thing twice by accident.

Captions are generated from the post's `title`/`excerpt`, or you can
hand-write them per post via optional `linkedinText`/`instagramCaption`
frontmatter fields (see `src/types/index.ts`).
