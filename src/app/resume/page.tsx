import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Josh Nykamp",
  description: "Engineering leadership experience — Senior Director of Engineering at DraftKings.",
};

const summary =
  "Engineering executive with 15 years of success commanding technology strategy, organizational transformation, and product delivery across regulated, high scale consumer platforms. Proven force in building elite teams, integrating acquired organizations, modernizing architecture, and converting engineering investment into measurable growth. Drove AI native development across five teams to cut cycle time by 30% and launched product lines producing more than $3M in incremental ARR.";

const coreCompetencies = [
  "Engineering Organization Design",
  "Technology Strategy",
  "AI Native SDLC",
  "Mergers and Acquisitions Integration",
  "Platform Architecture",
  "DevOps & CI/CD",
  "Cloud Infrastructure",
  "Product Engineering",
  "Enterprise Architecture",
  "High Concurrency Systems",
  "Talent Acquisition & Retention",
  "Regulatory Compliance",
  "Site Reliability Engineering",
];

const careerHighlights = [
  "Scaled engineering from 11 to more than 70 professionals with zero regrettable attrition and 20 referral hires, helping position Jackpocket for its $750M acquisition by DraftKings",
  "Cut infrastructure costs by 50% while establishing the largest production Elixir organization in the US",
  "Transformed deployment cadence from 1–2 monthly releases to hundreds of deployments per month within six months, implementing progressive delivery, guarded releases, and a roll-forward incident response strategy",
];

const experience = [
  {
    company: "DraftKings, formerly Jackpocket",
    role: "Senior Director of Engineering",
    period: "Jan 2024 — Present",
    location: "Remote",
    highlights: [
      "Completed engineering role evaluation and functional reallocation within three months by integrating 70 positions and moving SRE, security, and QA talent into shared DraftKings verticals",
      "Reduced engineering cycle time by 30% by deploying Claude, Gemini, and GitHub Copilot across planning, story authoring, development, and debugging workflows",
      "Generated $3M in incremental ARR by launching keno and scaling scratch-off ticket products across five states",
      "Consolidated three contractor relationships into one internal capability by founding and staffing a six-person hardware engineering team for automated lottery and scratch-off dispensing machines",
      "Modernized ticket discovery and segmentation by replacing a Tesseract-based OCR pipeline with a self-hosted Qwen vision model, reducing adaptation to ticket-format changes from days of engineering work to little or no code changes",
    ],
  },
  {
    company: "Jackpocket",
    role: "VP of Engineering",
    period: "Jan 2021 — Dec 2023",
    location: "Remote",
    highlights: [
      "Expanded engineering from 11 to more than 70 engineers, three SREs, two security engineers, and five engineering managers by activating trusted networks that produced 20 referral hires with zero regrettable attrition",
      "Doubled product velocity by restructuring a monolithic organization into dedicated ecommerce and fulfillment teams with independent backlogs, ownership, and release cycles",
      "Transformed delivery from 1–2 releases per month to continuous deployment within six months, embedding DevSecOps practices including automated CI/CD, static code analysis, secret scanning, feature flags, and progressive delivery",
      "Established the fulfillment platform that enabled scratch-off tickets as a scalable product line, orchestrating ticket ordering, activation, automated scratching and scanning, winner validation, and ML-based ticket-to-customer matching",
    ],
  },
  {
    company: "Weedmaps",
    role: "Director of Engineering",
    period: "Sep 2019 — Jun 2021",
    location: "Irvine, CA (Remote)",
    highlights: [
      "Created $3M in monthly GMV within six months by hiring 13 engineers and building the Exchange platform from the ground up across California, Oklahoma, and Michigan",
      "Enabled distributed execution across five teams by directing 45 engineers and coordinating nearshore staff augmentation in Costa Rica and Colombia",
      "Standardized titles, leveling, and performance management during companywide growth from 50 to 211 engineers by authoring the Engineering Career Ladder and review process",
    ],
  },
  {
    company: "Weedmaps",
    role: "Engineering Manager",
    period: "Aug 2017 — Sep 2019",
    location: "Irvine, CA",
    highlights: [
      "Enabled hundreds of thousands of deliveries annually by building and launching Weedmaps Logistics with Android and iOS driver applications and a web dispatch interface",
      "Halved infrastructure costs by piloting Elixir as the replacement for Ruby on Rails and building the training model that established the largest production Elixir organization in the United States",
    ],
  },
  {
    company: "Weedmaps",
    role: "Senior Software Engineer",
    period: "Oct 2016 — Aug 2017",
    location: "Irvine, CA",
    highlights: [
      "Created the foundation for three new product lines by diagnosing a minified PHP codebase with no recoverable repository and executing a complete rebuild in Elixir",
      "Established the architecture for the migration to Elixir, standardizing new services on Elixir and Phoenix with REST APIs for frontend integration and RabbitMQ for asynchronous service-to-service communication",
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
  "Languages & Frameworks": [
    "Elixir / Phoenix",
    "Ruby on Rails",
    "Python",
    "Node.js",
    "GraphQL / Apollo",
    "React / Next.js",
  ],
  "Cloud & DevOps": [
    "AWS",
    "Google Cloud Platform",
    "GitHub Actions",
    "Argo",
    "Docker",
    "LaunchDarkly",
  ],
  "Artificial Intelligence": ["Claude", "Gemini", "Qwen", "GitHub Copilot"],
  "Platforms & Operations": ["RabbitMQ", "Datadog", "StrongDM", "Jira"],
  "Mobile Engineering": ["iOS", "Android"],
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

interface ResumeRowProps {
  period: string;
  location?: string;
  children: React.ReactNode;
}

function ResumeRow({ period, location, children }: ResumeRowProps) {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      <div className="md:col-span-1">
        <p className="text-stone-400 text-sm font-mono">{period}</p>
        {location && (
          <p className="text-stone-500 text-xs mt-1">{location}</p>
        )}
      </div>
      <div className="md:col-span-3">{children}</div>
    </div>
  );
}

export default function ResumePage() {
  return (
    <div className="container-content py-20 max-w-3xl">
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

      <section className="mb-14">
        <p className="text-stone-300 leading-relaxed mb-6">{summary}</p>
        <div className="flex flex-wrap gap-2">
          {coreCompetencies.map((item) => (
            <span
              key={item}
              className="px-3 py-1 bg-stone-800 border border-stone-700 rounded-sm text-stone-300 text-xs font-mono"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="label-mono mb-8">Career Highlights</h2>
        <ul className="space-y-3">
          {careerHighlights.map((highlight) => (
            <li key={highlight} className="flex gap-2 text-stone-300 text-sm">
              <span className="text-gold mt-0.5 flex-shrink-0">→</span>
              {highlight}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-14">
        <h2 className="label-mono mb-8">Experience</h2>
        <div className="space-y-12">
          {experience.map((job) => (
            <ResumeRow
              key={`${job.company}-${job.period}`}
              period={job.period}
              location={job.location}
            >
              <h3 className="heading-display text-lg text-gold">{job.role}</h3>
              <p className="text-stone-300 text-sm mb-3">{job.company}</p>
              <ul className="space-y-1.5">
                {job.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2 text-stone-400 text-sm">
                    <span className="text-gold mt-0.5 flex-shrink-0">→</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </ResumeRow>
          ))}
        </div>
      </section>

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

      <section className="mb-14">
        <h2 className="label-mono mb-8">Education</h2>
        <div className="space-y-8">
          {education.map((school) => (
            <ResumeRow key={school.institution} period={school.period}>
              <h3 className="heading-display text-lg text-gold">{school.institution}</h3>
              <p className="text-stone-300 text-sm">{school.focus}</p>
            </ResumeRow>
          ))}
        </div>
      </section>

      <section>
        <h2 className="label-mono mb-8">Military</h2>
        <ResumeRow period="2000 — 2004">
          <h3 className="heading-display text-lg text-gold">U.S. Navy</h3>
        </ResumeRow>
      </section>
    </div>
  );
}
