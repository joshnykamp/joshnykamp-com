import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Engineering leadership experience — Senior Director of Engineering at DraftKings.",
};

const experience = [
  {
    company: "DraftKings",
    role: "Senior Director of Engineering",
    period: "20XX — Present",
    location: "Boston, MA (Remote)",
    highlights: [
      "Lead X engineering teams across Y product areas",
      "Responsible for Z engineers across frontend, backend, and platform",
      // TODO: Fill in with real highlights
    ],
  },
  // TODO: Add previous roles
];

const skills = {
  "Leadership": ["Engineering Management", "Team Building", "Org Design", "Hiring", "Technical Strategy"],
  "Engineering": ["Distributed Systems", "High-Scale Architecture", "TypeScript", "React", "Node.js"],
  "Process": ["Agile / Scrum", "OKRs", "Incident Management", "Technical Roadmapping"],
};

export default function ResumePage() {
  return (
    <div className="container-content py-20 max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-16 pb-8 border-b border-stone-700">
        <div>
          <p className="label-mono mb-3">Resume</p>
          <h1 className="heading-display text-4xl md:text-5xl mb-3">Josh Nykamp</h1>
          <p className="text-stone-400">Senior Director of Engineering · DraftKings</p>
        </div>
        <a
          href="/josh-nykamp-resume.pdf"
          className="btn-outline flex-shrink-0"
          download
        >
          Download PDF
        </a>
      </div>

      {/* Experience */}
      <section className="mb-14">
        <h2 className="label-mono mb-8">Experience</h2>
        <div className="space-y-12">
          {experience.map((job) => (
            <div key={job.company} className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                <p className="text-stone-400 text-sm font-mono">{job.period}</p>
                <p className="text-stone-500 text-xs mt-1">{job.location}</p>
              </div>
              <div className="md:col-span-3">
                <h3 className="heading-display text-lg text-gold">{job.role}</h3>
                <p className="text-stone-300 text-sm mb-3">{job.company}</p>
                <ul className="space-y-1.5">
                  {job.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2 text-stone-400 text-sm">
                      <span className="text-gold mt-0.5">→</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-14">
        <h2 className="label-mono mb-8">Skills</h2>
        <div className="space-y-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                <p className="text-stone-500 text-xs font-mono uppercase tracking-wider">{category}</p>
              </div>
              <div className="md:col-span-3 flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-stone-800 border border-stone-700 rounded-sm text-stone-300 text-xs font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education — placeholder */}
      <section>
        <h2 className="label-mono mb-8">Education</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <p className="text-stone-400 text-sm font-mono">TODO</p>
          </div>
          <div className="md:col-span-3">
            <h3 className="heading-display text-lg text-gold">Your Degree</h3>
            <p className="text-stone-300 text-sm">Your University</p>
          </div>
        </div>
      </section>
    </div>
  );
}
