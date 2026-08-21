#!/usr/bin/env tsx
/**
 * Cross-post a published blog post to LinkedIn and/or Instagram.
 *
 * Usage:
 *   npm run social:publish -- <slug> --linkedin --instagram [--dry-run]
 *
 * At least one of --linkedin/--instagram is required — this never defaults
 * to "all platforms", since there's no draft/published flag or publish
 * history to guard against an accidental double-post.
 */
import { getPostBySlug } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";
import { PUBLISHERS, buildLinkedInText, buildInstagramCaption } from "@/lib/social";
import { loadEnv } from "./lib/env-file";

loadEnv();

function parseArgs(argv: string[]) {
  const platforms: string[] = [];
  let slug: string | undefined;
  let dryRun = false;

  for (const arg of argv) {
    if (arg === "--dry-run") dryRun = true;
    else if (arg.startsWith("--")) platforms.push(arg.slice(2));
    else if (!slug) slug = arg;
  }

  return { slug, platforms, dryRun };
}

async function main() {
  const { slug, platforms, dryRun } = parseArgs(process.argv.slice(2));

  if (!slug) {
    console.error("Usage: npm run social:publish -- <slug> --linkedin --instagram [--dry-run]");
    process.exit(1);
  }

  if (platforms.length === 0) {
    console.error("Specify at least one platform: --linkedin and/or --instagram");
    process.exit(1);
  }

  const unknown = platforms.filter((p) => !PUBLISHERS[p]);
  if (unknown.length > 0) {
    console.error(`Unknown platform(s): ${unknown.join(", ")}. Known: ${Object.keys(PUBLISHERS).join(", ")}`);
    process.exit(1);
  }

  const post = await getPostBySlug(slug);
  if (!post) {
    console.error(`No post found for slug "${slug}" in content/posts/`);
    process.exit(1);
  }

  const url = `${SITE_URL}/blog/${slug}`;
  let hadFailure = false;

  for (const platformName of platforms) {
    const publisher = PUBLISHERS[platformName];
    const text =
      platformName === "instagram" ? buildInstagramCaption(post, url) : buildLinkedInText(post);

    if (dryRun) {
      console.log(`\n[dry-run] ${platformName}`);
      console.log(`  text: ${text}`);
      if (platformName === "instagram") {
        console.log(`  image: ${SITE_URL}${post.ogImage ?? "/images/og-default.jpg"}`);
      }
      continue;
    }

    const configured = publisher.isConfigured();
    if (!configured.ok) {
      console.log(`\n✗ ${platformName}: skipped — ${configured.reason}`);
      hadFailure = true;
      continue;
    }

    const result = await publisher.publish({ post, url, text });
    if (result.ok) {
      console.log(`\n✓ ${platformName}: ${result.postUrl ?? result.id ?? "published"}`);
    } else {
      console.log(`\n✗ ${platformName}: ${result.error}`);
      hadFailure = true;
    }
  }

  if (hadFailure) process.exit(1);
}

main();
