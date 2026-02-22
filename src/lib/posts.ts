import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, PostMeta } from "@/types";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

function ensurePostsDir() {
  if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });
}

export async function getAllPosts(): Promise<PostMeta[]> {
  ensurePostsDir();
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const rt = readingTime(content);

    return {
      slug,
      title: data.title ?? "Untitled",
      date: data.date ?? new Date().toISOString(),
      excerpt: data.excerpt ?? "",
      category: data.category,
      readingTime: rt.text,
      ogImage: data.ogImage,
    } as PostMeta;
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getRecentPosts(n: number): Promise<PostMeta[]> {
  const all = await getAllPosts();
  return all.slice(0, n);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  ensurePostsDir();
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    slug,
    title: data.title ?? "Untitled",
    date: data.date ?? new Date().toISOString(),
    excerpt: data.excerpt ?? "",
    category: data.category,
    readingTime: rt.text,
    ogImage: data.ogImage,
    content,
  };
}
