import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Josh Nykamp",
  description: "Engineering leadership experience — Senior Director of Engineering at DraftKings.",
};

const experience = [
  {
    company: "DraftKings",
    role: "Senior Director of Engineering",
    period: "2024 — Present",
    location: "Remote",
    highlights: [
      "Led integration of Jackpocket into the DraftKings ecosystem post-acquisition",
      "Expanded lottery product line — launched keno and scaled scratchers across the platform",
      "Founded a new hardware team building machines for lottery and scratcher automation",
    ],
  },
  {
    company: "Jackpocket (acquired by DraftKings)",
    role: "VP of Engineering",
    period: "2021 — 2024",
    location: "Remote",
    highlights: [
      "Inherited a single large team with no clear ownership boundaries; split engineering into dedicated ecommerce and fulfillment orgs with separate backlogs and independent release cycles",
      "Redesigned core architecture around a message bus with a testable interface, decoupling ecommerce and fulfillment so each could ship independently",
      "Ran an Accelerate book club and drove full DevOps adoption — within 6 months the team went from 1–2 releases per month to deploying many times per day behind feature flags, eliminating rollbacks",
      "Launched scratchers in 2022, adding a new line of business to the platform",
      "Grew the engineering org from 11 to 50 engineers, 3 SREs, 2 security engineers, and 5 managers over 3 years with no regrettable attrition",
      "Built a test suite and CI/CD pipeline robust enough to eliminate QA entirely by 2024",
    ],
  },
  {
    company: "Weedmaps",
    role: "Director of Engineering",
    period: "Sep 2019 — Jun 2021",
    location: "Irvine, CA (Remote)",
    highlights: [
      "Partnered with GM to write the business plan, gather requirements, and define product specs for Weedmaps Exchange — the company's B2B wholesale marketplace",
      "Hired 13 engineers to build Weedmaps Exchange; launched May 2019 — within 6 months it was generating $3M in monthly GMV",
      "Hired and developed Engineering Managers; managed offshore teams in Costa Rica and Colombia",
      "Authored the Weedmaps Engineering Career Ladder and review process; designed new SDLC to improve team performance tracking",
    ],
  },
  {
    company: "Weedmaps",
    role: "Engineering Manager",
    period: "Aug 2017 — Sep 2019",
    location: "Irvine, CA",
    highlights: [
      "Built and launched Weedmaps Logistics — Android/iOS driver apps and a web dispatch interface for managing pickup orders and assigning drivers",
      "Managed 2 cross-functional teams of 8 engineers with zero attrition; maintained 98% test coverage and 99.9% uptime across all production systems",
      "Piloted Elixir adoption to replace Ruby; created an Elixir training program to upskill existing engineers and onboard new hires",
      "Created a junior engineer training program; hired 50+ engineers across the organization",
    ],
  },
  {
    company: "Weedmaps",
    role: "Senior Software Engineer",
    period: "Oct 2016 — Aug 2017",
    location: "Irvine, CA",
    highlights: [
      "Built a GraphQL API using Elixir/Phoenix; developed frontend applications in React, GraphQL, and Apollo",
      "Established Docker-based development environments across engineering teams",
    ],
  },
  {
    company: "NBC (via Gorilla Logic)",
    role: "Senior Software Engineer — Contractor",
    period: "2016",
    location: "Remote",
    highlights: [
      "Converted NBC.com from Drupal 7 to a headless architecture with a Node.js/React frontend",
      "Built live streaming infrastructure for Olympic coverage on Drupal 7",
    ],
  },
  {
    company: "TalentReef",
    role: "Software Engineer",
    period: "2014 — 2015",
    location: "",
    highlights: [
      "Built a SaaS platform for social recruiting of hourly employees using Drupal",
      "Developed custom Drupal modules; managed CentOS servers",
      "Managed migration from outsourced to in-house development",
      "Decoupled the Drupal view layer using Angular",
    ],
  },
  {
    company: "I-Behavior",
    role: "Software Engineer",
    period: "2013",
    location: "",
    highlights: [
      "Built internal web applications at a big data company using Laravel and Angular",
    ],
  },
  {
    company: "New Frontier Media / Hustler",
    role: "Software Engineer",
    period: "2011 — 2013",
    location: "",
    highlights: [
      "Built a single sign-on 360° web experience for cable subscribers",
      "Co-developed one of the first adult smart TV applications — built a custom JavaScript UI framework backed by a PHP API at the dawn of the smart TV era",
    ],
  },
];

const skills = {
  "Leadership": [
    "Engineering Management",
    "Org Design",
    "Hiring & Talent Development",
    "Career Laddering",
    "Offshore Team Management",
    "OKRs & SDLC",
  ],
  "Engineering": [
    "Elixir / Phoenix",
    "Node.js",
    "React",
    "GraphQL / Apollo",
    "PHP / Laravel / Drupal",
    "TypeScript",
    "Docker",
    "Android / iOS",
  ],
  "Architecture": [
    "Distributed Systems",
    "High-Scale Architecture",
    "Headless CMS",
    "API Design",
    "Smart TV / Embedded",
  ],
};

const education = [
  {
    institution: "Miami Ad School",
    focus: "Advertising & Photography",
    period: "2005 — 2006",
  },
  {
    institution: "Santa Barbara City College",
    focus: "General Studies",
    period: "2004 — 2005",
  },
];

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
          {experience.map((job, idx) => (
            <div key={idx} className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                <p className="text-stone-400 text-sm font-mono">{job.period}</p>
                {job.location && (
                  <p className="text-stone-500 text-xs mt-1">{job.location}</p>
                )}
              </div>
              <div className="md:col-span-3">
                <h3 className="heading-display text-lg text-gold">{job.role}</h3>
                <p className="text-stone-300 text-sm mb-3">{job.company}</p>
                {job.highlights.length > 0 && (
                  <ul className="space-y-1.5">
                    {job.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2 text-stone-400 text-sm">
                        <span className="text-gold mt-0.5 flex-shrink-0">→</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
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

      {/* Education */}
      <section className="mb-14">
        <h2 className="label-mono mb-8">Education</h2>
        <div className="space-y-8">
          {education.map((ed) => (
            <div key={ed.institution} className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                <p className="text-stone-400 text-sm font-mono">{ed.period}</p>
              </div>
              <div className="md:col-span-3">
                <h3 className="heading-display text-lg text-gold">{ed.institution}</h3>
                <p className="text-stone-300 text-sm">{ed.focus}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Military */}
      <section>
        <h2 className="label-mono mb-8">Military</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <p className="text-stone-400 text-sm font-mono">2000 — 2004</p>
          </div>
          <div className="md:col-span-3">
            <h3 className="heading-display text-lg text-gold">U.S. Navy</h3>
          </div>
        </div>
      </section>

    </div>
  );
}
