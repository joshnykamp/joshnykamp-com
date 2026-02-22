import type { Metadata } from "next";
import Link from "next/link";
import { getRecentPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";

export const metadata: Metadata = {
  title: "Josh Nykamp — Engineering Leader & Photographer",
};

export default async function HomePage() {
  const recentPosts = await getRecentPosts(3);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex items-center border-b border-stone-700 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,201,122,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(122,184,232,0.04),transparent_60%)]" />

        <div className="container-content w-full py-32">
          <p className="label-mono mb-6">Senior Director of Engineering · DraftKings</p>
          <h1 className="heading-display text-5xl md:text-7xl lg:text-8xl text-stone-100 max-w-4xl mb-8">
            Building teams.<br />
            <span className="text-gold">Capturing places.</span>
          </h1>
          <p className="text-stone-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            Engineering and Photos
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/blog" className="btn-primary">Read the blog</Link>
            <Link href="/photography" className="btn-outline">View photography</Link>
          </div>
        </div>
      </section>

      {/* ── Recent Posts ── */}
      <section className="container-content py-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="label-mono mb-2">Latest writing</p>
            <h2 className="heading-display text-3xl md:text-4xl">Engineering Blog</h2>
          </div>
          <Link href="/blog" className="btn-outline hidden md:inline-flex">
            All posts →
          </Link>
        </div>
        {recentPosts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="card p-12 text-center text-stone-500">
            <p>First post coming soon.</p>
          </div>
        )}
        <div className="mt-8 md:hidden">
          <Link href="/blog" className="btn-outline w-full justify-center">All posts →</Link>
        </div>
      </section>

      {/* ── Photography Tease ── */}
      <section className="border-t border-stone-700 bg-stone-900">
        <div className="container-content py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="label-mono mb-2">Photography</p>
              <h2 className="heading-display text-3xl md:text-4xl max-w-lg">
                Travel & landscape photography from the field.
              </h2>
            </div>
            <Link href="/photography" className="btn-outline flex-shrink-0">
              View gallery →
            </Link>
          </div>
          {/* Placeholder grid — replace with real <Image> components */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-12">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-stone-800 border border-stone-700 rounded-sm flex items-center justify-center"
              >
                <span className="label-mono text-stone-600">photo {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About strip ── */}
      <section className="border-t border-stone-700">
        <div className="container-content py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label-mono mb-3">About</p>
              <h2 className="heading-display text-3xl mb-5">
                Engineer for money.<br />
                <span className="text-gold">Take photos for fun.</span>
              </h2>
              <p className="text-stone-400 leading-relaxed mb-6">
                Senior Director of Engineering at DraftKings, where I lead the lottery fulfillment teams. Outside of work, I photograph 
                landscapes and travel destinations around the world.
              </p>
              <Link href="/about" className="btn-outline">More about me →</Link>
            </div>
            <div className="aspect-square bg-stone-800 border border-stone-700 rounded-sm flex items-center justify-center">
              <span className="label-mono text-stone-600">headshot</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
