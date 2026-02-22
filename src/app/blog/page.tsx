import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing about engineering leadership, team building, and software at scale.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container-content py-20">
      <p className="label-mono mb-4">Engineering Blog</p>
      <h1 className="heading-display text-4xl md:text-6xl mb-6 max-w-2xl">
        Writing on engineering<br />
        <span className="text-gold">& leadership.</span>
      </h1>
      <p className="text-stone-400 max-w-xl mb-16 leading-relaxed">
        Lessons from building teams and systems at DraftKings. 
        Thoughts on engineering leadership, technical strategy, and the craft of software.
      </p>

      {posts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="card p-16 text-center">
          <p className="label-mono text-stone-600 mb-2">Coming soon</p>
          <p className="text-stone-500 text-sm">First post is in the works.</p>
        </div>
      )}
    </div>
  );
}
