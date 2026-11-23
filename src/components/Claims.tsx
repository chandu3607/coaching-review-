import Image from "next/image";
import { BACKING, BY, INST, REAL99, TOTAL_CLAIM, CLAIMERS, fmt, type Backing } from "@/lib/coaching";
import { HBars } from "./HBars";
import { Logo } from "./Logo";
import { CountUp } from "./CountUp";

export const BACKING_COLOR: Record<Backing, string> = { audited: "#10b981", named: "#3ba4f0", partial: "#f59e0b", none: "#94a3b8" };

export function ClaimBars() {
  const rows = [...INST].sort((a, b) => (b.claim || -1) - (a.claim || -1)).map((I) => ({
    id: I.id, label: I.name, href: `/institutes/${I.id}`, v: I.claim, color: BACKING_COLOR[I.backing],
    tx: I.claim ? <b className="text-slate-900">{I.claimTxt}</b> : I.claimTxt, sub: BACKING[I.backing][0],
  }));
  return <HBars rows={rows} max={935} />;
}

export function TrendChart() {
  const who = ["iq", "cr", "cl", "eg"] as const;
  const cols = ["#133a5f", "#2e8fd9", "#1b5d94"];
  const max = 600;
  return (
    <div>
      <div className="flex h-56 items-end justify-around gap-3 border-b border-slate-200 px-2" role="img" aria-label={`Claimed 99+ percentilers over three years: ${who.map((id) => `${BY[id].name} ${BY[id].years!.map((y) => y ?? "no figure").join(", ")}`).join("; ")}`}>
        {who.map((id) => (
          <div key={id} className="flex h-full flex-1 items-end justify-center gap-1.5">
            {BY[id].years!.map((y, j) => y === null ? <div key={j} className="w-5 sm:w-7" /> : (
              <div key={j} className="flex h-full w-5 flex-col items-center justify-end sm:w-7">
                <span className="mb-1 text-[10px] font-semibold tabular-nums text-slate-600">{y}</span>
                <span className="w-full rounded-t-md" style={{ height: `${(y / max) * 82}%`, background: cols[j] }} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-around">{who.map((id) => <span key={id} className="flex flex-col items-center gap-1 text-xs font-semibold text-slate-700"><Logo I={BY[id]} s={22} />{BY[id].short}</span>)}</div>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
        {["2023", "2024", "2025"].map((y, j) => <span key={y} className="flex items-center gap-1.5"><i className="h-3 w-3 rounded" style={{ background: cols[j] }} />{y}</span>)}
        <span>Only institutes that published more than one year</span>
      </div>
    </div>
  );
}

export function Claims() {
  const over = TOTAL_CLAIM - REAL99;
  const claimers = [...INST].filter((I) => I.claim).sort((a, b) => (b.claim || 0) - (a.claim || 0));
  const scale = TOTAL_CLAIM;
  return (
    <section id="results" className="scroll-mt-20">
      <div className="relative isolate overflow-hidden bg-ink py-20 text-white sm:py-24">
        <Image src="/images/results.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/85 to-ink" />
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow !text-brand-300"><span className="mr-2">04</span>Claims vs reality</p>
            <h2 className="mt-2 text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-3xl">CAT 2025 had about {fmt(REAL99)} 99+ percentilers.</h2>
            <p className="mt-6 flex items-baseline gap-3">
              <span className="text-4xl font-extrabold tabular-nums text-sky-300 sm:text-5xl"><CountUp to={TOTAL_CLAIM} /></span>
              <span className="max-w-[16rem] text-slate-600">claimed by {CLAIMERS} institutes.</span>
            </p>
            <p className="mt-5 max-w-lg text-slate-600">
              <b className="text-rose-300">{fmt(over)}</b> more claims than real toppers. Many students join several institutes, so one topper is often counted more than once.
            </p>
          </div>
          <div>
            <div className="rounded-3xl border border-white/10 bg-white/[.06] p-6 backdrop-blur">
              <div className="relative">
                <div className="flex h-14 overflow-hidden rounded-xl" role="img" aria-label={`${fmt(REAL99)} real 99+ percentilers against ${fmt(TOTAL_CLAIM)} claimed, ${fmt(over)} more than the real total`}>
                  {claimers.map((I) => (
                    <div key={I.id} title={`${I.name}: ${I.claimTxt}`} className="border-r border-ink/60 last:border-0" style={{ width: `${((I.claim || 0) / scale) * 100}%`, background: BACKING_COLOR[I.backing] }} />
                  ))}
                </div>
                <div className="absolute -top-2 bottom-[-8px] border-l-2 border-dashed border-white" style={{ left: `${(REAL99 / scale) * 100}%` }}>
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold">Real total: {fmt(REAL99)}</span>
                </div>
                <div className="absolute inset-y-0 right-0 rounded-r-xl bg-rose-500/100/70 mix-blend-multiply" style={{ width: `${(over / scale) * 100}%` }} />
              </div>
              <ul className="mt-6 grid gap-x-5 gap-y-2 text-xs text-slate-600 sm:grid-cols-2">
                {(["audited", "named", "partial"] as Backing[]).map((b) => (
                  <li key={b} className="flex items-center gap-2"><i className="h-3 w-3 rounded" style={{ background: BACKING_COLOR[b] }} />{BACKING[b][0]}</li>
                ))}
                <li className="flex items-center gap-2"><i className="h-3 w-3 rounded bg-rose-500/100/70" />Claims beyond the real total</li>
              </ul>
              <p className="mt-4 text-xs text-slate-400">2.58 lakh candidates took CAT 2025, so the top 1% is about 2,580. Each claim is the main figure the institute itself publishes.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface py-12 sm:py-14">
        <div className="container-x">
          <h3 className="text-xl font-bold tracking-tight sm:text-2xl">Institute by institute</h3>
          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow mb-4 !text-slate-500">CAT 2025: claimed 99+ percentilers</p>
              <ClaimBars />
            </div>
            <div>
              <p className="eyebrow mb-4 !text-slate-500">Over three years</p>
              <TrendChart />
            </div>
          </div>
          <p className="mt-8 max-w-3xl text-sm text-slate-500">Institutes count in different ways. IMS includes test-series buyers and mentors, and T.I.M.E. reports 2024 offers, not percentiles. So the totals can’t be compared directly.</p>
        </div>
      </div>
    </section>
  );
}
