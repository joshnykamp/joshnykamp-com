import type { Metadata } from "next";
import "@/styles/globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { OG_DEFAULT_IMAGE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Josh Nykamp — Engineering Leader & Photographer",
    template: "%s | Josh Nykamp",
  },
  description:
    "Senior Director of Engineering at DraftKings. Amateur travel and landscape photographer. Writing about engineering leadership, team building, and the craft of software.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Josh Nykamp",
    images: [{ url: OG_DEFAULT_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@joshnykamp",
  },
  robots: { index: true, follow: true },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 page-enter">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
