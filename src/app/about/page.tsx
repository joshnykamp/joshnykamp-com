import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Senior Director of Engineering at DraftKings. Navy veteran, photographer, splitting time between Huntington Beach and Ireland.",
};

export default function AboutPage() {
  return (
    <div className="container-content py-20">
      <p className="label-mono mb-4">About</p>
      <h1 className="heading-display text-4xl md:text-6xl mb-16 max-w-3xl">
        Hi, I'm Josh.<br />
        <span className="text-gold">This is the long version.</span>
      </h1>

      <div className="grid md:grid-cols-3 gap-16">
        <div className="md:col-span-1">
          <div className="aspect-[3/4] rounded-sm overflow-hidden border border-stone-700 mb-4">
            <Image
              src="/images/headshot-about.jpg"
              alt="Josh Nykamp"
              width={600}
              height={800}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>
          <div className="space-y-2">
            <a href="https://linkedin.com/in/joshnykamp" target="_blank" rel="noopener noreferrer" className="btn-outline w-full justify-center text-sm">LinkedIn →</a>
            <Link href="/resume" className="btn-outline w-full justify-center text-sm">View Resume →</Link>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="heading-display text-xl mb-3 text-gold">The Engineering Side</h2>
            <div className="space-y-4 text-stone-300 leading-relaxed">
              <p>
                I got out of the Navy about 20 years ago and taught myself ActionScript.
                My first real job was as a PHP engineer at Hustler — not a typical origin story,
                but it got me writing production code fast. From there I moved through PHP,
                Node, and React at NBC, then spent a year as an Elixir engineer at Weedmaps
                before moving into management.
              </p>
              <p>
                I spent five years at Weedmaps, leaving as Director of Engineering around the
                time it went public. Then joined Jackpocket as VP of Engineering, where I
                implemented agile/scrum and a proper DevOps culture — taking the team from
                releasing once or twice a month to shipping every commit. Two years ago
                DraftKings acquired Jackpocket, and now I'm a Senior Director of Engineering
                on the lottery fulfillment team, focused on getting the team to embed AI
                into the SDLC.
              </p>
              <p>
                I write about engineering leadership, team building, and the practical side
                of adopting new technology — when I have something worth saying.
              </p>
            </div>
          </div>

          <div>
            <h2 className="heading-display text-xl mb-3 text-gold">The Photography Side</h2>
            <div className="space-y-4 text-stone-300 leading-relaxed">
              <p>
                I shoot landscape and travel photography — mostly the kind of places you
                find when you split time between Southern California and rural Ireland.
                Entirely self-taught, still figuring it out, and fine with that.
              </p>
              <p>
                Living in Huntington Beach gives me coastline. Spending a quarter of my time
                in Leixlip gives me green hills, grey skies, and a completely different
                kind of light. It's a good combination.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-700">
            <h3 className="label-mono mb-4">Currently</h3>
            <ul className="space-y-2 text-stone-400 text-sm">
              <li className="flex gap-3"><span className="text-gold">→</span> Senior Director of Engineering · DraftKings Lottery Fulfillment</li>
              <li className="flex gap-3"><span className="text-gold">→</span> Splitting time between Huntington Beach, CA and Leixlip, Ireland</li>
              <li className="flex gap-3"><span className="text-gold">→</span> Embedding AI into the engineering SDLC</li>
              <li className="flex gap-3"><span className="text-gold">→</span> Shooting landscapes on both sides of the Atlantic</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
