"use client";
import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      if (ref.current) ref.current.style.transform = `scaleX(${Math.min(1, p)})`;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white/5"><div ref={ref} className="h-full origin-left scale-x-0 bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-400" /></div>;
}
