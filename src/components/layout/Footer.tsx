import Link from "next/link";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/josh-nykamp/" },
  { label: "Instagram", href: "https://instagram.com/joshnykamp" },
  { label: "GitHub", href: "https://github.com/joshnykamp" },
];

export function Footer() {
  return (
    <footer className="border-t border-stone-700 py-10">
      <div className="container-content flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-stone-500 text-sm font-mono">
          © {new Date().getFullYear()} Josh Nykamp
        </div>
        <div className="flex gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-gold text-sm font-mono transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
