"use client";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/coaching";

const SECTIONS = NAV.sections;

/** Sticky pill nav under the header with scroll-spy. */
export function SectionNav() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const els = SECTIONS.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: "-35% 0px -60% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <div className="sticky top-14 z-30 border-b border-white/[.06] bg-slate-50/75 backdrop-blur-xl">
      <nav aria-label="On this page" className="container-x flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
        {SECTIONS.map(([id, label]) => (
          <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition ${active === id ? "bg-white/10 text-white" : "text-slate-500 hover:bg-white/5 hover:text-slate-800"}`}>{label}</a>
        ))}
      </nav>
    </div>
  );
}
