import Link from "next/link";
import { format } from "date-fns";
import type { PostMeta } from "@/types";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card p-6 flex flex-col gap-4 group"
    >
      <div>
        <p className="label-mono mb-2 text-gold/70">{post.category ?? "Engineering"}</p>
        <h3 className="heading-display text-lg leading-snug group-hover:text-gold transition-colors">
          {post.title}
        </h3>
      </div>
      <p className="text-stone-400 text-sm leading-relaxed flex-1">{post.excerpt}</p>
      <div className="flex items-center justify-between text-stone-600 text-xs font-mono mt-auto pt-2 border-t border-stone-700">
        <time>{format(new Date(post.date), "MMM d, yyyy")}</time>
        <span>{post.readingTime}</span>
      </div>
    </Link>
  );
}
