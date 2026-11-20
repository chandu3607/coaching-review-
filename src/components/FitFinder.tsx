"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { INST, PARAMS, f1, fitScore, strengths, type ParamKey } from "@/lib/coaching";
import { LogoBox, LogoTile } from "./Logo";
import { SectionHeading } from "./SectionHeading";

export function FitFinder() {
  const [prio, setPrio] = useState<ParamKey[]>([]);
  const ranked = useMemo(() => INST.map((I) => ({ I, v: fitScore(I, prio) })).sort((a, b) => b.v - a.v), [prio]);
  const top = ranked[0];
  const toggle = (k: ParamKey) => setPrio((p) => (p.includes(k) ? p.filter((x) => x !== k) : p.length >= 3 ? p : [...p, k]));

  return (
    <section id="fit" className="scroll-mt-20 py-14 sm:py-16">
      <div className="container-x">
        <SectionHeading n="07" eyebrow="Your fit" title="Find my fit" lede="Pick up to three things that matter most. Each counts four times as much in your ranking." />
        <div className="mt-10 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <div className="card h-fit p-6">
            <p className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span>Your priorities</span><span className="rounded-full bg-brand-50 px-2.5 py-1 text-brand-700">{prio.length} of 3</span>
            </p>
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Your priorities">
              {PARAMS.map((p) => {
                const on = prio.includes(p.k), full = !on && prio.length >= 3;
                return (
                  <button key={p.k} type="button" aria-pressed={on} disabled={full} onClick={() => toggle(p.k)}
                    className={`chip ${on ? "border-brand-600 bg-brand-600 text-white shadow-sm" : "border-slate-300 bg-surface text-slate-700 hover:border-brand-400 hover:bg-brand-50"} disabled:cursor-not-allowed disabled:opacity-40`}>
                    {on && <span className="mr-1.5">✓</span>}{p.n}
                  </button>
                );
              })}
            </div>
            {prio.length > 0 && <button type="button" onClick={() => setPrio([])} className="mt-4 text-sm font-medium text-slate-500 underline underline-offset-2 hover:text-slate-800">Clear all</button>}
          </div>

          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-violet-600 p-6 text-white shadow-glow sm:p-8" aria-live="polite">
              <div className="flex flex-wrap items-center gap-5">
                <LogoTile I={top.I} size={88} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-100">Your top match</p>
                  <Link href={`/institutes/${top.I.id}`} className="mt-1 block text-2xl font-extrabold tracking-tight hover:underline sm:text-3xl">{top.I.name}</Link>
                  <p className="mt-1 text-sm text-white">Strongest: {strengths(top.I)}</p>
                </div>
                <div className="text-3xl font-extrabold tabular-nums sm:text-4xl">{f1(top.v)}</div>
              </div>
            </div>
            <ol className="card divide-y divide-slate-100">
              {ranked.map((x, i) => (
                <li key={x.I.id}>
                  <Link href={`/institutes/${x.I.id}`} className="flex items-center gap-4 px-5 py-3.5 transition hover:bg-slate-50">
                    <span className="w-5 text-sm font-semibold tabular-nums text-slate-400">{i + 1}</span>
                    <LogoBox I={x.I} s={26} w={70} />
                    <span className="min-w-0 flex-1"><span className="block truncate font-semibold">{x.I.name}</span><span className="block truncate text-xs text-slate-500">{strengths(x.I)}</span></span>
                    <span className="hidden h-2 w-32 overflow-hidden rounded-full bg-slate-100 sm:block"><span className={`block h-full rounded-full transition-all duration-500 ${i === 0 ? "bg-brand-600" : "bg-slate-300"}`} style={{ width: `${x.v * 10}%` }} /></span>
                    <span className={`w-10 text-right text-lg font-extrabold tabular-nums ${i === 0 ? "text-brand-700" : "text-slate-800"}`}>{f1(x.v)}</span>
                  </Link>
                </li>
              ))}
            </ol>
            <p className="text-xs text-slate-500">Your score out of 10, based on what you picked. If you pick nothing, it is the same as the overall score.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
