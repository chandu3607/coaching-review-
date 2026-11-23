import Link from "next/link";
import { CLAIMERS, HOME, INST, N_CHECKS, PARAMS, RANKED, X247, f1 } from "@/lib/coaching";
import { Logo, LogoTile } from "./Logo";
import { ScoreRing } from "./ScoreRing";
import { CountUp } from "./CountUp";
import { SectionHeading } from "./SectionHeading";

const Dots = ({ on, total, color }: { on: number; total: number; color: string }) => (
  <div className="mt-3 flex gap-1.5">{Array.from({ length: total }, (_, i) => <i key={i} className={`h-2 flex-1 rounded-full ${i < on ? color : "bg-white/10"}`} />)}</div>
);

export function Bento() {
  const best = RANKED[0];
  const winners = PARAMS.map((p, i) => {
    const max = Math.max(...INST.map((I) => I.sc[i]));
    return { p, max, who: INST.filter((I) => I.sc[i] === max) };
  });
  return (
    <section className="py-14 sm:py-16">
      <div className="container-x">
        <SectionHeading eyebrow={HOME.bento.eyebrow} title={HOME.bento.title} lede={HOME.bento.lede} />
        <div className="mt-8 grid auto-rows-[minmax(140px,auto)] gap-4 md:grid-cols-4 lg:grid-cols-6">
          {/* best overall */}
          <Link href={`/institutes/${best.id}`} className="tilt spot gborder glass group relative overflow-hidden rounded-3xl p-5 md:col-span-2 lg:row-span-2">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
            <p className="eyebrow !text-emerald-300">Best overall</p>
            <div className="mt-5 flex flex-col items-center text-center">
              <ScoreRing value={best.o} size={132} stroke={10} id="bento-best" textClass="text-4xl" caption="out of 10" />
              <div className="mt-4 flex items-center gap-3"><LogoTile I={best} size={40} /><div className="text-left"><p className="font-semibold text-white">{best.name}</p><p className="text-xs text-slate-500">Rank 1 of {INST.length}</p></div></div>
              <p className="mt-4 text-[13px] leading-relaxed text-slate-600">{best.stand.split("; ").slice(0, 2).join(" · ")}</p>
            </div>
            <span className="mt-4 block text-center text-xs font-semibold text-sky-300 group-hover:underline">View profile →</span>
          </Link>

          {/* winners list */}
          <div className="tilt gborder glass rounded-3xl p-5 md:col-span-4 lg:col-span-4 lg:row-span-2">
            <div className="flex items-center justify-between"><p className="eyebrow">Who leads each area</p><span className="text-[11px] text-slate-500">Highest score of {INST.length}</span></div>
            <ul className="mt-3 grid gap-x-8 sm:grid-cols-2">
              {winners.map(({ p, max, who }) => (
                <li key={p.k} className="flex items-center gap-3 border-b border-white/[.06] py-2.5 last:border-0 sm:[&:nth-last-child(2)]:border-0">
                  <span className="w-28 shrink-0 text-[13px] text-slate-600">{p.n.replace(" & live classes", "").replace(" & dashboard", "")}</span>
                  <span className="flex min-w-0 flex-1 items-center gap-2">
                    {who.slice(0, 3).map((I) => <Link key={I.id} href={`/institutes/${I.id}`} aria-label={I.name} className="opacity-90 transition hover:opacity-100"><Logo I={I} s={18} /></Link>)}
                    {who.length > 3 && <span className="text-[11px] text-slate-500">+{who.length - 3}</span>}
                  </span>
                  <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-bold tabular-nums text-emerald-300">{f1(max)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="tilt gborder glass rounded-3xl p-5 md:col-span-2">
            <p className="eyebrow">Publish a 99+ count</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-white"><CountUp to={CLAIMERS} /> <span className="text-base font-medium text-slate-500">of {INST.length}</span></p>
            <Dots on={CLAIMERS} total={INST.length} color="bg-sky-400" />
            <p className="mt-3 text-xs text-slate-500">{HOME.bento.claimsNote}</p>
          </div>
          <div className="tilt gborder glass rounded-3xl p-5 md:col-span-2">
            <p className="eyebrow">24×7 doubt support</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-white"><CountUp to={X247} /> <span className="text-base font-medium text-slate-500">of {INST.length}</span></p>
            <Dots on={X247} total={INST.length} color="bg-emerald-400" />
            <p className="mt-3 text-xs text-slate-500">{HOME.bento.doubtsNote}</p>
          </div>
          <div className="tilt gborder glass rounded-3xl p-5 md:col-span-2">
            <p className="eyebrow">Checks behind every score</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-white"><CountUp to={N_CHECKS} /></p>
            <Dots on={PARAMS.length} total={PARAMS.length} color="bg-violet-400" />
            <p className="mt-3 text-xs text-slate-500">{HOME.bento.checksNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
