import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, PostMeta } from "@/types";

const POSTS_DIR = path.join(process.cwd(), "content/posts");
const DEFAULT_CATEGORY = "Engineering";

function ensurePostsDir() {
  if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });
}

function parsePost(
  slug: string,
  raw: string
): { meta: PostMeta; content: string } {
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: data.title ?? "Untitled",
      date: data.date ?? new Date().toISOString(),
      excerpt: data.excerpt ?? "",
      category: data.category ?? DEFAULT_CATEGORY,
      readingTime: readingTime(content).text,
      ogImage: data.ogImage,
    },
    content,
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  ensurePostsDir();

  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
      return parsePost(file.replace(/\.mdx$/, ""), raw).meta;
    });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getRecentPosts(count: number): Promise<PostMeta[]> {
  const posts = await getAllPosts();
  return posts.slice(0, count);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  ensurePostsDir();

  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const { meta, content } = parsePost(slug, fs.readFileSync(filePath, "utf-8"));
  return { ...meta, content };
}
