import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Senior Director of Engineering at DraftKings and amateur travel & landscape photographer.",
};

export default function AboutPage() {
  return (
    <div className="container-content py-20">
      <p className="label-mono mb-4">About</p>
      <h1 className="heading-display text-4xl md:text-6xl mb-16 max-w-3xl">
        Engineer, leader,<br />
        <span className="text-gold">photographer.</span>
      </h1>

      <div className="grid md:grid-cols-3 gap-16">
        {/* Photo */}
        <div className="md:col-span-1">
          <div className="aspect-[3/4] bg-stone-800 border border-stone-700 rounded-sm flex items-center justify-center mb-4">
            <span className="label-mono text-stone-600">headshot</span>
          </div>
          <div className="space-y-2">
            <a
              href="https://linkedin.com/in/joshnykamp"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full justify-center text-sm"
            >
              LinkedIn →
            </a>
            <Link href="/resume" className="btn-outline w-full justify-center text-sm">
              View Resume →
            </Link>
          </div>
        </div>

        {/* Bio */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="heading-display text-xl mb-3 text-gold">The Engineering Side</h2>
            <div className="space-y-4 text-stone-300 leading-relaxed">
              <p>
                I'm a Senior Director of Engineering at DraftKings, where I lead teams 
                building the technology behind one of the largest sports betting and gaming 
                platforms in North America.
              </p>
              <p>
                My work sits at the intersection of engineering leadership, team culture, 
                and high-scale systems. I care deeply about building great teams — not just 
                great software — and I write about those experiences on this blog.
              </p>
            </div>
          </div>

          <div>
            <h2 className="heading-display text-xl mb-3 text-gold">The Photography Side</h2>
            <div className="space-y-4 text-stone-300 leading-relaxed">
              <p>
                When I'm not thinking about distributed systems or team dynamics, I'm usually 
                chasing light somewhere. I shoot travel and landscape photography — wide open 
                spaces, dramatic skies, places that feel genuinely remote.
              </p>
              <p>
                Photography grounds me in a different kind of problem-solving. Both disciplines 
                reward patience, iteration, and the willingness to try things that might not work.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-700">
            <h3 className="label-mono mb-4">Currently</h3>
            <ul className="space-y-2 text-stone-400 text-sm">
              <li className="flex gap-3"><span className="text-gold">→</span> Senior Director of Engineering · DraftKings</li>
              <li className="flex gap-3"><span className="text-gold">→</span> Shooting landscapes in the American West</li>
              <li className="flex gap-3"><span className="text-gold">→</span> Writing about engineering leadership</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
