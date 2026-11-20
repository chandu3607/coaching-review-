import Link from "next/link";
import { INST, PIC, RANKED, strengths } from "@/lib/coaching";
import { LogoTile } from "./Logo";
import { RadarChart } from "./RadarChart";
import { ScoreRing } from "./ScoreRing";
import { SectionHeading } from "./SectionHeading";

export function InstituteCards() {
  return (
    <section id="institutes" className="scroll-mt-28 py-14 sm:py-16">
      <div className="container-x">
        <SectionHeading n="02" eyebrow="Coachings" title="Eight coachings, eight different shapes" lede="Each shape is that institute’s ten scores. Wide and even means steady all round; a spike shows where it is strongest." />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {INST.map((I) => {
            const rank = RANKED.indexOf(I) + 1;
            return (
              <Link key={I.id} href={`/institutes/${I.id}`} className="tilt spot gborder glass group relative flex flex-col overflow-hidden rounded-3xl p-5 transition-shadow hover:shadow-glow">
                <div className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full blur-3xl transition-opacity group-hover:opacity-100 ${rank === 1 ? "bg-amber-400/25" : "bg-sky-400/15"} opacity-60`} />
                <div className="flex items-start justify-between">
                  <LogoTile I={I} size={52} />
                  <ScoreRing value={I.o} size={62} stroke={6} id={`card-${I.id}`} textClass="text-[15px]" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <h3 className="text-[15px] font-semibold tracking-tight">{I.name}</h3>
                  <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${rank === 1 ? "bg-gradient-to-br from-amber-300 to-orange-400 text-ink" : "bg-white/10 text-slate-600"}`}>#{rank}</span>
                </div>
                <p className="mt-1 min-h-[2.6rem] text-[13px] leading-snug text-slate-600">{PIC[I.id][0]}</p>
                <div className="my-3 flex justify-center transition-transform duration-500 group-hover:scale-110"><RadarChart values={I.sc} size={140} /></div>
                <p className="border-t border-white/[.06] pt-3 text-[11px] font-medium text-slate-500">Strongest · {strengths(I)}</p>
                <span className="mt-2 text-[13px] font-semibold text-sky-300 transition group-hover:translate-x-1">View profile →</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
