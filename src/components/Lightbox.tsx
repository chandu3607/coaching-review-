"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface Shot { src: string; title: string; caption: string; alt: string }

/** Grid of screenshots; click to open a full-size lightbox with caption. */
export function ShotGrid({ shots, kind = "web" }: { shots: Shot[]; kind?: "phone" | "web" }) {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % shots.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i + shots.length - 1) % shots.length));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, shots.length]);

  const phone = kind === "phone";
  return (
    <>
      <ul className={`grid gap-5 ${phone ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
        {shots.map((s, i) => (
          <li key={s.src}>
            <figure className="card overflow-hidden">
              <button type="button" onClick={() => setOpen(i)} className={`group relative block w-full overflow-hidden bg-slate-100 ${phone ? "aspect-[3/4.4]" : "aspect-[16/10]"}`} aria-label={`Enlarge: ${s.title}`}>
                <Image src={s.src} alt={s.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className={`transition duration-500 group-hover:scale-[1.03] ${phone ? "object-cover object-top" : "object-cover object-top"}`} />
                <span className="absolute right-2 top-2 rounded-full bg-ink/70 px-2 py-1 text-[10px] font-semibold text-white opacity-0 backdrop-blur transition group-hover:opacity-100">Enlarge ⤢</span>
              </button>
              <figcaption className="p-4 text-sm leading-relaxed text-slate-600"><b className="mb-0.5 block text-slate-900">{s.title}</b>{s.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label="Enlarged screenshot" className="fixed inset-0 z-[60] flex flex-col bg-ink/95 p-4 backdrop-blur-sm" onClick={() => setOpen(null)}>
          <div className="flex justify-end">
            <button type="button" className="btn btn-glass h-10" onClick={() => setOpen(null)}>Close ✕</button>
          </div>
          <div className="relative mx-auto my-3 min-h-0 w-full max-w-5xl flex-1" onClick={(e) => e.stopPropagation()}>
            <Image src={shots[open].src} alt={shots[open].alt} fill sizes="100vw" className="object-contain" />
          </div>
          <p className="mx-auto max-w-3xl pb-2 text-center text-sm text-slate-600" onClick={(e) => e.stopPropagation()}><b className="text-white">{shots[open].title}:</b> {shots[open].caption}</p>
        </div>
      )}
    </>
  );
}
