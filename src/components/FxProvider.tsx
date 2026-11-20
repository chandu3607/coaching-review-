"use client";
import { useEffect } from "react";

/** Scroll-reveal for `.reveal` and cursor spotlight for `.spot` — no deps. */
export function FxProvider() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("fx");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    const scan = () => document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    const move = (e: MouseEvent) => {
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>(".spot");
      if (!t) return;
      const r = t.getBoundingClientRect();
      t.style.setProperty("--mx", `${e.clientX - r.left}px`);
      t.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    const tilt = (e: MouseEvent) => {
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>(".tilt");
      if (!t || window.matchMedia("(hover: none)").matches) return;
      const r = t.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      t.style.setProperty("--ry", `${(px * 7).toFixed(2)}deg`);
      t.style.setProperty("--rx", `${(-py * 7).toFixed(2)}deg`);
    };
    const untilt = (e: MouseEvent) => {
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>(".tilt");
      if (t && !t.contains(e.relatedTarget as Node | null)) { t.style.setProperty("--rx", "0deg"); t.style.setProperty("--ry", "0deg"); }
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousemove", tilt, { passive: true });
    window.addEventListener("mouseout", untilt);
    return () => { io.disconnect(); mo.disconnect(); window.removeEventListener("mousemove", move); window.removeEventListener("mousemove", tilt); window.removeEventListener("mouseout", untilt); root.classList.remove("fx"); };
  }, []);
  return null;
}
