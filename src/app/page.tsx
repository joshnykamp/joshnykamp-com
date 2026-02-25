import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getRecentPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";

export const metadata: Metadata = {
  title: "Josh Nykamp — Engineering Leader & Photographer",
};

export default async function HomePage() {
  const recentPosts = await getRecentPosts(3);

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center border-b border-stone-700 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,201,122,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(122,184,232,0.04),transparent_60%)]" />
        <div className="container-content w-full py-32">
          <p className="label-mono mb-6">Senior Director of Engineering · DraftKings</p>
          <h1 className="heading-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-stone-100 max-w-4xl mb-8">
            Navy//Hustler//<br className="sm:hidden" />Weedmaps<br />
            <span className="text-gold">DraftKings.</span>
          </h1>
          <p className="text-stone-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            Engineering leader, amateur photographer, surfer, and mountain biker
            I split my time between Huntington Beach and Ireland.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/blog" className="btn-primary">Read the blog</Link>
            <Link href="/photography" className="btn-outline">View photography</Link>
          </div>
        </div>
      </section>

      <section className="container-content py-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="label-mono mb-2">Latest writing</p>
            <h2 className="heading-display text-3xl md:text-4xl">Engineering Blog</h2>
          </div>
          <Link href="/blog" className="btn-outline hidden md:inline-flex">All posts →</Link>
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
      </section>

      <section className="border-t border-stone-700 bg-stone-900">
        <div className="container-content py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="label-mono mb-2">Photography</p>
              <h2 className="heading-display text-3xl md:text-4xl max-w-lg">
                Photos from places I probably had no business getting to.
              </h2>
            </div>
            <Link href="/photography" className="btn-outline flex-shrink-0">View gallery →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-stone-800 border border-stone-700 rounded-sm flex items-center justify-center">
                <span className="label-mono text-stone-600">photo {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-700">
        <div className="container-content py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label-mono mb-3">About</p>
              <h2 className="heading-display text-3xl mb-5">
                Engineer by trade.<br />
                <span className="text-gold">Terrible at staying home.</span>
              </h2>
              <p className="text-stone-400 leading-relaxed mb-6">
                I started writing ActionScript after getting out of the Navy and somehow ended up
                as a Senior Director of Engineering at DraftKings. In between: PHP, Node, Elixir,
                a stint at NBC, five years at Weedmaps, and a VP role at Jackpocket before
                DraftKings acquired us. Based in Huntington Beach, perpetually in Ireland.
              </p>
              <Link href="/about" className="btn-outline">More about me →</Link>
            </div>
            <div className="aspect-square rounded-sm overflow-hidden border border-stone-700 bg-stone-950">
              <Image
                src="/images/headshot.jpg"
                alt="Josh Nykamp"
                width={600}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
