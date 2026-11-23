import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/config/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DisclosureBar } from "@/components/DisclosureBar";
import { FxProvider } from "@/components/FxProvider";
import { CommandPalette } from "@/components/CommandPalette";

const geistSans = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-geist-sans", weight: "100 900" });
const geistMono = localFont({ src: "./fonts/GeistMonoVF.woff", variable: "--font-geist-mono", weight: "100 900" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s · ${site.name}` },
  description: "Eight CAT coachings scored out of 10 in ten areas — results, faculty, mocks, doubts and more — using what institutes publish and what students say.",
};
export const viewport: Viewport = { themeColor: "#0a0b10" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-brand-500 focus:text-white focus:px-4 focus:py-2 focus:font-semibold">Skip to content</a>
        <FxProvider />
        <CommandPalette />
        <DisclosureBar />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
