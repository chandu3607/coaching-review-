"use client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { INST, NAV, f1 } from "@/lib/coaching";
import { Logo } from "./Logo";

type Item = { id: string; label: string; hint: string; href: string; inst?: (typeof INST)[number] };
const PAGES: Item[] = NAV.palette;

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(() => {
    const all: Item[] = [...INST.map((I) => ({ id: I.id, label: I.name, hint: `Institute · ${f1(I.o)}/10`, href: `/institutes/${I.id}`, inst: I })), ...PAGES];
    const s = q.trim().toLowerCase();
    return s ? all.filter((x) => (x.label + " " + x.hint).toLowerCase().includes(s)) : all;
  }, [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
      else if (e.key === "/" && !/input|textarea|select/i.test((e.target as HTMLElement).tagName)) { e.preventDefault(); setOpen(true); }
      else if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("open-palette", onOpen); };
  }, []);
  useEffect(() => { if (open) { setQ(""); setI(0); setTimeout(() => inputRef.current?.focus(), 20); document.body.style.overflow = "hidden"; } else document.body.style.overflow = ""; }, [open]);
  useEffect(() => setI(0), [q]);

  const go = (it?: Item) => { if (!it) return; setOpen(false); router.push(it.href); };
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Search" className="fixed inset-0 z-[70] flex items-start justify-center bg-black/60 p-4 pt-[14vh] backdrop-blur-sm" onMouseDown={() => setOpen(false)}>
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-surface-raised shadow-2xl" onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-white/10 px-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-slate-500" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Jump to an institute, section or tool…" aria-label="Search"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setI((x) => Math.min(items.length - 1, x + 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setI((x) => Math.max(0, x - 1)); }
              if (e.key === "Enter") go(items[i]);
            }}
            className="h-12 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500" />
          <kbd className="rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-slate-500">ESC</kbd>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto p-1.5" role="listbox">
          {items.length === 0 && <li className="px-3 py-8 text-center text-sm text-slate-500">Nothing found for “{q}”.</li>}
          {items.map((it, n) => (
            <li key={it.id} role="option" aria-selected={n === i}>
              <button type="button" onMouseEnter={() => setI(n)} onClick={() => go(it)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm ${n === i ? "bg-white/[.08] text-white" : "text-slate-700"}`}>
                <span className="flex w-12 shrink-0 justify-start">{it.inst ? <Logo I={it.inst} s={18} /> : <span className="grid h-6 w-6 place-items-center rounded-md bg-white/[.06] text-xs text-slate-500">↗</span>}</span>
                <span className="flex-1 truncate">{it.label}</span>
                <span className="text-xs text-slate-500">{it.hint}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 text-[11px] text-slate-500"><span>↑↓ navigate · ↵ open</span><span>Tip: press / anywhere</span></div>
      </div>
    </div>
  );
}
