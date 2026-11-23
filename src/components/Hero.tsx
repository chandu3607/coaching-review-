"use client";
import Link from "next/link";
import { useState } from "react";
import { HERO_PRIO, INST, PARAMS, RUB, TOTAL_CLAIM, REAL99, X247, fitScore, f1, fmt, type ParamKey } from "@/lib/coaching";
import { LogoBox, Logo } from "./Logo";
import { CountUp } from "./CountUp";
import { ScoreRing } from "./ScoreRing";
import { site } from "@/config/site";

export function Hero() {
  const [prio, setPrio] = useState<ParamKey | null>(null);
  const sel = prio ? [prio] : [];
  const ranked = [...INST].sort((a, b) => fitScore(b, sel) - fitScore(a, sel) || a.name.localeCompare(b.name));
  const rows = prio ? ranked : [...INST].sort((a, b) => b.oRaw - a.oRaw);
  const top = ranked[0];
  const topV = fitScore(top, sel);
  const nCrit = PARAMS.reduce((t, p) => t + RUB[p.k].length, 0);

  return (
    <section className="relative isolate overflow-hidden">
      {/* <div className="grid-bg absolute inset-0 -z-10" /> */}
      <div className="drift absolute left-[8%] top-[-9rem] -z-10 h-[26rem] w-[34rem] rounded-full bg-sky-500/25 blur-[120px]" />
      {/* <div className="drift absolute right-[2%] top-8 -z-10 h-80 w-80 rounded-full bg-violet-500/25 blur-[110px] [animation-delay:-6s]" /> */}
      <div className="drift absolute bottom-[-6rem] left-[40%] -z-10 h-64 w-64 rounded-full bg-cyan-400/15 blur-[100px] [animation-delay:-11s]" />

      <div className="container-x grid items-center gap-14 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_.95fr]">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] py-1 pl-2 pr-3.5 text-[11px] font-medium text-slate-600 backdrop-blur">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Updated {site.checked} · {INST.length} institutes · {nCrit} checks each
          </p>
          <h1 className="mt-5 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[2.7rem] lg:text-[3.2rem]">
            Pick the right CAT coaching <span className="gradient-text">before you pay a rupee.</span>
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-600">
            Honest scores out of 10 for results, faculty, mocks, doubt support and more, built from what institutes publish and what students say.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <Link href="/#scores" className="btn btn-primary h-10 px-5">See the scorecard</Link>
            <Link href="/compare" className="btn btn-glass h-10 px-5">Compare side by side</Link>
            {/* <button type="button" onClick={() => window.dispatchEvent(new Event("open-palette"))} className="btn btn-ghost hidden h-10 sm:inline-flex">
              Search <kbd className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-slate-500">Ctrl K</kbd>
            </button> */}
          </div>

          <div className="mt-9" role="group" aria-label="What matters most to you">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">I care most about</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {HERO_PRIO.map(([k, label]) => (
                <button key={k} type="button" aria-pressed={prio === k} onClick={() => setPrio(prio === k ? null : k)}
                  className={`chip ${prio === k ? "border-sky-400/60 bg-sky-400/15 text-sky-100 shadow-[0_0_24px_-6px_rgba(56,189,248,.7)]" : "border-white/10 bg-white/[.03] text-slate-700 hover:border-white/20 hover:bg-white/[.07]"}`}>
                  {label}
                </button>
              ))}
            </div>
            <p className="mt-2.5 min-h-5 text-[13px] text-slate-500" aria-live="polite">
              {prio ? <>Best match: <b className="text-white">{top.name}</b> · {f1(topV)}/10</> : "Tap one and the leaderboard re-orders for you."}
            </p>
          </div>
        </div>

        <div className="relative animate-fade-up lg:pb-20 lg:pt-14 [animation-delay:.12s]">
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-sky-500/20 via-transparent to-violet-500/20 blur-2xl" />
          <aside className="tilt spot glass gborder rounded-3xl p-3 shadow-2xl" aria-label="Leaderboard">
            <div className="flex items-center justify-between px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sky-400" />{prio ? "Ranked for you" : "Leaderboard"}</span><span className="lg:hidden">Out of 10</span>
            </div>
            <ul className="space-y-0.5">
              {rows.map((I, n) => {
                const v = prio ? fitScore(I, sel) : I.o;
                return (
                  <li key={I.id}>
                    <Link href={`/institutes/${I.id}`} className={`group flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-white/[.07] ${n === 0 ? "bg-white/[.05]" : ""}`}>
                      <span className={`grid h-5 w-5 place-items-center rounded-md text-[10px] font-bold tabular-nums ${n === 0 ? "bg-gradient-to-br from-amber-300 to-orange-400 text-ink" : n < 3 ? "bg-white/10 text-slate-800" : "text-slate-500"}`}>{n + 1}</span>
                      <LogoBox I={I} s={22} w={60} dark />
                      <span className="hidden min-w-0 flex-1 truncate text-[13px] font-medium text-slate-800 sm:block">{I.name}</span>
                      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-white/[.07] sm:w-24">
                        <span className="block h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-300 to-emerald-300 transition-all duration-700" style={{ width: `${v * 10}%` }} />
                      </span>
                      <span className="w-8 text-right text-sm font-bold tabular-nums text-white">{f1(v)}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* floating cards */}
          <div className="glass gborder absolute right-0 top-0 hidden animate-float items-center gap-3 rounded-2xl p-3 pr-4 shadow-xl lg:flex">
            <ScoreRing value={topV} size={64} stroke={6} id="hero-top" textClass="text-base" />
            <div><p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{prio ? "Your top match" : "Top overall"}</p><p className="mt-0.5 flex items-center gap-2 text-sm font-semibold"><Logo I={top} s={16} />{top.short}</p></div>
          </div>
          <div className="glass gborder absolute bottom-0 left-2 hidden animate-float rounded-2xl p-3.5 shadow-xl [animation-delay:-5s] lg:block">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">24×7 doubt help</p>
            <p className="mt-1 text-xl font-bold text-white"><CountUp to={X247} /> <span className="text-sm font-medium text-slate-500">of {INST.length}</span></p>
            <div className="mt-2 flex gap-1">{INST.map((I, i) => <i key={I.id} className={`h-1.5 w-3 rounded-full ${i < X247 ? "bg-emerald-400" : "bg-white/10"}`} />)}</div>
          </div>
          <div className="glass gborder absolute bottom-2 right-2 hidden animate-float rounded-2xl p-3.5 shadow-xl [animation-delay:-8s] lg:block">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Claimed vs real 99+</p>
            <p className="mt-1 text-sm font-bold text-white"><span className="text-rose-300">{fmt(TOTAL_CLAIM)}</span> <span className="font-medium text-slate-500">vs</span> <span className="text-emerald-300">{fmt(REAL99)}</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}
