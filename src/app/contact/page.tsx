import type { Metadata } from "next";
import { EMAIL, SOCIAL_LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Josh Nykamp.",
};

const links = [
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, note: "Best for professional inquiries" },
  { label: "Instagram", href: SOCIAL_LINKS.instagram, note: "Photography updates" },
  { label: "GitHub", href: SOCIAL_LINKS.github, note: "Code & projects" },
  { label: "Email", href: `mailto:${EMAIL}`, note: EMAIL },
];

export default function ContactPage() {
  return (
    <div className="container-content py-20 max-w-2xl">
      <p className="label-mono mb-4">Contact</p>
      <h1 className="heading-display text-4xl md:text-5xl mb-6">
        Let's <span className="text-gold">connect.</span>
      </h1>
      <p className="text-stone-400 leading-relaxed mb-16 max-w-md">
        I'm always happy to talk about engineering leadership, photography, 
        or interesting opportunities. Reach out on whatever platform makes sense.
      </p>

      <div className="space-y-3">
        {links.map((link) => {
          const isExternal = link.href.startsWith("http");

          return (
            <a
              key={link.label}
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="flex items-center justify-between p-5 card hover:bg-stone-800 group transition-colors"
            >
              <div>
                <p className="font-medium text-stone-100 group-hover:text-gold transition-colors">
                  {link.label}
                </p>
                <p className="text-stone-500 text-sm mt-0.5 font-mono">{link.note}</p>
              </div>
              <span className="text-stone-600 group-hover:text-gold transition-colors text-lg">→</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
