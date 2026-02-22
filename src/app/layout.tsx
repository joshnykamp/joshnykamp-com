import type { Metadata } from "next";
import "@/styles/globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://joshnykamp.com"),
  title: {
    default: "Josh Nykamp — Engineering Leader & Photographer",
    template: "%s | Josh Nykamp",
  },
  description:
    "Senior Director of Engineering at DraftKings. Amateur travel and landscape photographer. Writing about engineering leadership, team building, and the craft of software.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://joshnykamp.com",
    siteName: "Josh Nykamp",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@joshnykamp",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-stone-950 text-stone-100">
        <Nav />
        <main className="flex-1 page-enter">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
