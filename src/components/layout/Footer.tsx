import { SOCIAL_LINKS } from "@/lib/site";

const socials = [
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { label: "Instagram", href: SOCIAL_LINKS.instagram },
  { label: "GitHub", href: SOCIAL_LINKS.github },
];

export function Footer() {
  return (
    <footer className="border-t border-stone-700 py-10">
      <div className="container-content flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-stone-500 text-sm font-mono">
          © {new Date().getFullYear()} Josh Nykamp
        </div>
        <div className="flex gap-6">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-gold text-sm font-mono transition-colors"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
