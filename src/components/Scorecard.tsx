"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { INST, PARAMS, PIDX, WHY, f1, heat, type ParamKey } from "@/lib/coaching";

const BEST = PARAMS.map((_, i) => Math.max(...INST.map((I) => I.sc[i])));
import { LogoBox } from "./Logo";
import { RatingPill } from "./ScoreBadge";
import { SectionHeading } from "./SectionHeading";

const bands: [number, string][] = [[8, "8 and above"], [6.5, "6.5 to 7.9"], [5, "5 to 6.4"], [4, "under 5"]];

export function Scorecard() {
  const [key, setKey] = useState<ParamKey | "o">("o");
  const rows = useMemo(
    () => [...INST].sort((a, b) => (key === "o" ? b.oRaw - a.oRaw : b.sc[PIDX[key]] - a.sc[PIDX[key]] || b.oRaw - a.oRaw)),
    [key]
  );

  return (
    <section id="scores" className="scroll-mt-20 py-14 sm:py-16">
      <div className="container-x">
        <SectionHeading
          n="01" eyebrow="Scorecard" title="The scorecard"
          lede={`${INST.length} CAT coachings, each scored out of 10 in ${PARAMS.length} areas. The scores use what each institute publishes and what students say, and they are not final yet. Tap a column to sort. A ★ marks the best in each area.`}
        />
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
          {bands.map(([v, l]) => (<span key={l} className="flex items-center gap-2"><RatingPill v={v} />{l}</span>))}
        </div>

        <div className="card mt-6 overflow-x-auto">
          <table className="w-full min-w-[860px] border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-surface px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Institute</th>
                {PARAMS.map((p) => (
                  <th key={p.k} className="px-1 py-3">
                    <button type="button" aria-pressed={key === p.k} onClick={() => setKey(p.k)} className={`w-full rounded-lg px-2 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${key === p.k ? "bg-brand-600 text-white" : "text-slate-500 hover:bg-slate-100"}`}>
                      {p.s}
                    </button>
                  </th>
                ))}
                <th className="px-2 py-3">
                  <button type="button" aria-pressed={key === "o"} onClick={() => setKey("o")} className={`w-full rounded-lg px-2 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${key === "o" ? "bg-ink text-white" : "text-slate-500 hover:bg-slate-100"}`}>Overall</button>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((I, rk) => (
                <tr key={I.id} className="group [&:hover_td>div]:brightness-125">
                  <td className="sticky left-0 z-10 border-t border-slate-100 bg-surface px-4 py-2.5">
                    <Link href={`/institutes/${I.id}`} className="flex items-center gap-3 font-semibold text-slate-900 hover:text-brand-600">
                      <span className={`grid h-5 w-5 place-items-center rounded-md text-[10px] font-bold tabular-nums ${rk === 0 ? "bg-gradient-to-br from-amber-300 to-orange-400 text-ink" : "bg-white/[.07] text-slate-500"}`}>{rk + 1}</span>
                      <LogoBox I={I} s={24} w={64} />
                      <span className="hidden whitespace-nowrap md:inline">{I.name}</span>
                    </Link>
                  </td>
                  {I.sc.map((v, i) => {
                    const h = heat(v);
                    return (
                      <td key={i} className="border-t border-slate-100 p-1">
                        <div title={`${PARAMS[i].n}: ${WHY[PARAMS[i].k][I.id]}`} className={`relative rounded-lg py-2.5 text-center font-semibold tabular-nums transition ${v === BEST[i] ? "ring-1 ring-white/60 shadow-[0_0_18px_-4px_rgba(125,211,252,.7)]" : ""}`} style={{ background: h.bg, color: h.fg }}>
                          {f1(v)}{v === BEST[i] && <span aria-label="best" className="absolute -right-0.5 -top-1 text-[9px] text-amber-300">★</span>}
                        </div>
                      </td>
                    );
                  })}
                  <td className="border-t border-slate-100 px-3 py-2.5 text-right">
                    <span className="inline-flex items-center gap-2"><span className="text-base font-extrabold tabular-nums">{f1(I.o)}</span><RatingPill v={I.o} className="hidden xl:inline-flex" /></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-sm text-slate-500">
          The overall score is the average of the ten. Scores are based on what institutes publish and what students report, not on classes we sat in.{" "}
          <Link href="/methodology" className="font-medium text-brand-600 underline underline-offset-2">See how we score</Link>.
        </p>
      </div>
    </section>
  );
}
