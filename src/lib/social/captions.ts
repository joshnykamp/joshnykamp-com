import type { PostMeta } from "@/types";

/**
 * Pure text generation only — no fetch, no env reads, no secrets.
 * Safe to import from anywhere, including client components.
 */

export function buildLinkedInText(post: PostMeta): string {
  if (post.linkedinText) return post.linkedinText;

  return `${post.title}\n\n${post.excerpt}`;
}

export function buildInstagramCaption(post: PostMeta, url: string): string {
  if (post.instagramCaption) return post.instagramCaption;

  return `${post.title}\n\n${post.excerpt}\n\nFull post: ${url} (link in bio)`;
}
