"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, site } from "@/lib/coaching";
import { ScrollProgress } from "./ScrollProgress";

const links = NAV.header;

export function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  const openSearch = () => window.dispatchEvent(new Event("open-palette"));

  return (
    <header className="sticky top-0 z-40 border-b border-white/[.06] bg-slate-50/70 backdrop-blur-xl">
      <div className="container-x relative flex h-14 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-tight text-white">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-sky-400 to-violet-500 shadow-glow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          </span>
          {site.name}
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main">
          {links.map((l) => {
            const active = !l.href.includes("#") && path.startsWith(l.href);
            return <Link key={l.href} href={l.href} className={`rounded-full px-3 py-1.5 text-[13px] font-medium transition ${active ? "bg-white/10 text-white" : "text-slate-600 hover:bg-white/5 hover:text-white"}`}>{l.label}</Link>;
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" onClick={openSearch} aria-label="Search (Ctrl K)" className="hidden h-8 items-center gap-2 rounded-full border border-white/10 bg-white/[.04] pl-3 pr-2 text-xs text-slate-500 transition hover:bg-white/[.08] hover:text-slate-800 sm:flex">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            Search<kbd className="ml-3 rounded border border-white/10 px-1.5 py-0.5 text-[10px]">Ctrl K</kbd>
          </button>
          <Link href={NAV.headerCta.href} className="btn btn-primary hidden h-8 md:inline-flex">{NAV.headerCta.label}</Link>
          <button type="button" onClick={openSearch} aria-label="Search" className="btn btn-ghost h-8 w-8 !px-0 sm:hidden"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg></button>
          <button type="button" className="btn btn-ghost h-8 md:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((v) => !v)}>{open ? "Close" : "Menu"}</button>
        </div>
        <ScrollProgress />
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-white/[.06] md:hidden" aria-label="Mobile">
          <div className="container-x grid gap-1 py-3">
            {links.map((l) => <Link key={l.href} href={l.href} className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-white/5">{l.label}</Link>)}
            <Link href={NAV.headerCta.href} className="btn btn-primary mt-2 h-10">{NAV.headerCta.label}</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
