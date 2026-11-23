import type { Metadata } from "next";
import Link from "next/link";
import { BACKING, BY, CLOSE, INST, PAGES, PARAMS, f1, fmt, tpl, type InstId } from "@/lib/coaching";
import { Logo, LogoTile } from "@/components/Logo";
import { heat } from "@/lib/coaching";

const C = PAGES.compare;
export const metadata: Metadata = { title: C.metaTitle };

const COLORS = ["#3ba4f0", "#a78bfa", "#34d399"];

function MultiRadar({ sets }: { sets: { id: InstId; v: number[] }[] }) {
  const n = PARAMS.length, c = 100, R = 66;
  const pt = (i: number, v: number) => { const a = (Math.PI * 2 * i) / n - Math.PI / 2; return [c + Math.cos(a) * R * (v / 10), c + Math.sin(a) * R * (v / 10)] as const; };
  const poly = (vals: number[]) => vals.map((v, i) => pt(i, v).join(",")).join(" ");
  return (
    <svg viewBox="-30 -4 260 208" role="img" aria-label="Radar chart comparing the selected institutes" className="mx-auto w-full max-w-[380px]">
      {[2.5, 5, 7.5, 10].map((r) => <polygon key={r} points={poly(PARAMS.map(() => r))} fill="none" stroke="rgba(255,255,255,.08)" />)}
      {PARAMS.map((_, i) => { const [x, y] = pt(i, 10); return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="rgba(255,255,255,.08)" />; })}
      {sets.map((s, k) => <polygon key={s.id} points={poly(s.v)} fill={COLORS[k] + "26"} stroke={COLORS[k]} strokeWidth="2" strokeLinejoin="round" />)}
      {PARAMS.map((p, i) => { const a = (Math.PI * 2 * i) / n - Math.PI / 2; const x = c + Math.cos(a) * (R + 16), y = c + Math.sin(a) * (R + 16); return <text key={p.k} x={x} y={y + 3} textAnchor={Math.abs(Math.cos(a)) < 0.2 ? "middle" : Math.cos(a) > 0 ? "start" : "end"} fontSize="8.5" fontWeight="600" fill="#8791a8">{p.s}</text>; })}
    </svg>
  );
}

export default function Compare({ searchParams }: { searchParams: { ids?: string } }) {
  const parsed = (searchParams.ids ?? "").split(",").filter((x): x is InstId => x in BY);
  const ids = Array.from(new Set(parsed)).slice(0, 3);
  const sel = ids.length ? ids : C.defaultIds;
  const chosen = sel.map((id) => BY[id]);
  const toggle = (id: InstId) => {
    const next = sel.includes(id) ? sel.filter((x) => x !== id) : sel.length >= 3 ? [...sel.slice(1), id] : [...sel, id];
    return `/compare?ids=${next.join(",")}`;
  };

  const facts: [string, (I: (typeof INST)[number]) => string][] = [
    ["CAT 2025 99+ claim", (I) => (I.claim ? I.claimTxt : "No 2025 figure")],
    ["Claim check", (I) => BACKING[I.backing][0]],
    ["Live class hours", (I) => I.hours.txt],
    ["Recorded content", (I) => I.rec.txt],
    ["Practice questions", (I) => I.practice.txt],
    ["Doubt support", (I) => `${I.doubt.x247 ? "24×7 · " : ""}${I.doubt.resp}`],
    ["Mocks + sectionals", (I) => (I.mocks.full ? `${I.mocks.full} + ${I.mocks.sect ?? 0}` : "Not published")],
    ["Mock closeness to CAT", (I) => CLOSE[I.mocks.close]],
    ["Mentoring", (I) => I.mentor.txt],
  ];

  return (
    <div className="container-x py-10 sm:py-12">
      <p className="eyebrow">Compare</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{C.title}</h1>
      <p className="mt-2 max-w-xl text-sm text-slate-600">{C.lede}</p>

      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Choose institutes">
        {INST.map((I) => {
          const on = sel.includes(I.id);
          const k = sel.indexOf(I.id);
          return (
            <Link key={I.id} href={toggle(I.id)} scroll={false} aria-pressed={on} className={`chip gap-2 ${on ? "border-white/25 bg-white/10 text-white" : "border-white/10 bg-white/[.03] text-slate-600 hover:bg-white/[.07]"}`}>
              {on && <i className="h-2 w-2 rounded-full" style={{ background: COLORS[k] }} />}
              {I.name}
            </Link>
          );
        })}
      </div>

      <div className={`mt-8 grid gap-4 ${chosen.length === 3 ? "md:grid-cols-3" : chosen.length === 2 ? "md:grid-cols-2" : ""}`}>
        {chosen.map((I, k) => (
          <article key={I.id} className="card spot p-5">
            <div className="flex items-center gap-3">
              <LogoTile I={I} size={44} />
              <div className="min-w-0 flex-1"><h2 className="truncate text-base font-bold">{I.name}</h2><p className="flex items-center gap-1.5 text-xs text-slate-500"><i className="h-2 w-2 rounded-full" style={{ background: COLORS[k] }} />Overall</p></div>
              <span className="text-3xl font-bold tabular-nums text-white">{f1(I.o)}</span>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-slate-600">{I.stand}</p>
            <Link href={`/institutes/${I.id}`} className="mt-3 inline-block text-xs font-semibold text-sky-300 hover:underline">Full profile →</Link>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_.8fr]">
        <section className="card overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead><tr className="text-left text-[11px] uppercase tracking-wider text-slate-500"><th className="px-4 py-3 font-semibold">Area</th>{chosen.map((I) => <th key={I.id} className="px-2 py-3"><Logo I={I} s={18} /></th>)}</tr></thead>
            <tbody>
              {PARAMS.map((p, i) => {
                const best = Math.max(...chosen.map((I) => I.sc[i]));
                return (
                  <tr key={p.k} className="border-t border-white/[.06]">
                    <td className="px-4 py-2 text-slate-700">{p.n}</td>
                    {chosen.map((I) => { const h = heat(I.sc[i]); const win = chosen.length > 1 && I.sc[i] === best; return (
                      <td key={I.id} className="p-1.5"><div className={`rounded-lg py-1.5 text-center text-[13px] font-semibold tabular-nums ${win ? "ring-1 ring-white/70" : ""}`} style={{ background: h.bg, color: h.fg }}>{f1(I.sc[i])}</div></td>
                    ); })}
                  </tr>
                );
              })}
              <tr className="border-t border-white/10 bg-white/[.03]"><td className="px-4 py-2.5 font-bold text-white">Overall</td>{chosen.map((I) => <td key={I.id} className="px-2 text-center text-base font-bold tabular-nums text-white">{f1(I.o)}</td>)}</tr>
            </tbody>
          </table>
          <p className="px-4 pb-3 pt-2 text-[11px] text-slate-500">A white outline marks the best score in each row.</p>
        </section>
        <aside className="card p-5"><p className="eyebrow !text-slate-500">Shape</p><div className="mt-2"><MultiRadar sets={chosen.map((I) => ({ id: I.id, v: I.sc }))} /></div></aside>
      </div>

      <section className="card mt-6 overflow-x-auto">
        <table className="w-full min-w-[560px] text-[13px]">
          <tbody>
            {facts.map(([label, fn]) => (
              <tr key={label} className="border-t border-white/[.06] first:border-0 align-top">
                <th scope="row" className="w-44 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</th>
                {chosen.map((I) => <td key={I.id} className="px-3 py-3 text-slate-800">{fn(I)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <p className="mt-4 text-xs text-slate-500">{tpl(C.footnote)} {fmt(INST.length)} institutes covered.</p>
    </div>
  );
}
