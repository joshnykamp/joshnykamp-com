"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { clsx } from "clsx";

const links = [
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/blog", label: "Blog" },
  { href: "/photography", label: "Photography" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-700 bg-stone-950/90 backdrop-blur-sm">
      <div className="container-content flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif font-bold text-lg text-stone-100 hover:text-gold transition-colors"
        >
          Josh Nykamp
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "px-4 py-2 text-sm font-mono transition-colors rounded-sm",
                pathname.startsWith(link.href)
                  ? "text-gold"
                  : "text-stone-400 hover:text-stone-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-stone-400 hover:text-stone-100 p-2"
          aria-label="Toggle menu"
        >
          <div className={clsx("w-5 h-px bg-current transition-all mb-1.5", open && "rotate-45 translate-y-2")} />
          <div className={clsx("w-5 h-px bg-current transition-all mb-1.5", open && "opacity-0")} />
          <div className={clsx("w-5 h-px bg-current transition-all", open && "-rotate-45 -translate-y-2")} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-stone-700 bg-stone-950">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={clsx(
                "block px-6 py-4 text-sm font-mono border-b border-stone-800 transition-colors",
                pathname.startsWith(link.href)
                  ? "text-gold"
                  : "text-stone-400 hover:text-stone-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
