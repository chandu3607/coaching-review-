import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BY, CHANNELS, CLOSE, INST, PAGES, TAKE, tpl, type Institute } from "@/lib/coaching";
import { SectionHeading } from "@/components/SectionHeading";
import { HBars } from "@/components/HBars";
import { LogoBox } from "@/components/Logo";
import { ClaimBars, TrendChart } from "@/components/Claims";
import { ScoreStrip } from "@/components/ScoreStrip";

const P = PAGES.insights;
export const metadata: Metadata = { title: P.metaTitle };

const Band = ({ id, children, alt = false }: { id?: string; children: React.ReactNode; alt?: boolean }) => (
  <section id={id} className={`scroll-mt-20 py-12 sm:py-14 ${alt ? "bg-surface" : ""}`}><div className="container-x">{children}</div></section>
);
const Name = ({ I, short = false }: { I: Institute; short?: boolean }) => (
  <Link href={`/institutes/${I.id}`} className="flex items-center gap-3 font-semibold hover:text-brand-600"><LogoBox I={I} s={22} w={56} />{short ? I.short : I.name}</Link>
);
const Table = ({ head, children }: { head: string[]; children: React.ReactNode }) => (
  <div className="card overflow-x-auto"><table className="w-full min-w-[640px] text-sm"><thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500"><tr>{head.map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead><tbody className="divide-y divide-slate-100 [&_td]:px-4 [&_td]:py-3 [&_td]:align-top">{children}</tbody></table></div>
);

export default function Insights() {
  const topPct = (I: Institute) => (I.pct.length ? Math.max(...I.pct) : 0);
  const rhythm = P.rhythm;
  const mk = INST.filter((I) => I.mocks.full);
  const pra = ["iq", "cr", "im", "cl", "ti", "ro", "pw", "eg"].map((id) => {
    const I = BY[id as keyof typeof BY], p = I.practice;
    return id === "pw" || id === "eg"
      ? { id: I.id, label: I.short, v: null, tx: `${p.txt}${p.scope ? ` (${p.scope})` : ""}` }
      : { id: I.id, label: I.short, v: id === "ti" || id === "cl" ? (p.lo ?? p.v) : p.v, hi: id === "ti" || id === "cl" ? p.v : null, tx: <b className="text-slate-900">{p.txt}</b>, sub: p.scope };
  });

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink py-16 text-white sm:py-24">
        <div className="absolute -right-20 -top-20 -z-10 h-96 w-96 rounded-full bg-brand-600/30 blur-3xl" />
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="eyebrow !text-brand-300">{P.eyebrow}</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">{P.title}</h1>
            <p className="mt-5 max-w-xl text-base text-slate-600">{tpl(P.lede)}</p>
            <Link href="/methodology" className="btn btn-glass mt-6">{P.button}</Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-white/15"><Image src="/images/insights.jpg" alt="Rendered still life: a magnifying glass enlarging a score heatmap printed on a sheet" fill priority sizes="40vw" className="object-cover" /></div>
        </div>
      </section>

      {/* 01 results */}
      <Band id="results">
        <SectionHeading n="01" eyebrow="Results" title="Results" lede={TAKE.res} />
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div><p className="eyebrow mb-4 !text-slate-500">CAT 2025: claimed 99+ percentilers</p><ClaimBars /></div>
          <div><p className="eyebrow mb-4 !text-slate-500">Over three years</p><TrendChart /></div>
        </div>
        <ScoreStrip k="res" />
      </Band>

      {/* 02 faculty */}
      <Band alt>
        <SectionHeading n="02" eyebrow="Faculty" title="Faculty & live classes" lede={TAKE.fac} />
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4 !text-slate-500">Lead faculty: highest published percentile</p>
            <ul className="card divide-y divide-slate-100">
              {[...INST].sort((a, b) => topPct(b) - topPct(a)).map((I) => (
                <li key={I.id} className="flex items-center gap-4 px-4 py-3"><span className="w-28 shrink-0"><Name I={I} short /></span>
                  <span className="flex flex-wrap gap-1.5">{I.pct.length ? [...I.pct].sort((a, b) => b - a).map((v, i) => <span key={i} className={`rounded-md px-2 py-0.5 text-xs font-bold tabular-nums ${v >= 99.99 ? "bg-amber-500/15 text-amber-300" : "bg-brand-50 text-brand-700"}`}>{v}</span>) : <em className="text-sm text-slate-400">None published</em>}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-slate-500">Each chip is one named teacher, and amber means 99.99 or above. These are the institutes’ own figures.</p>
          </div>
          <div>
            <p className="eyebrow mb-4 !text-slate-500">Total live-class hours</p>
            <HBars max={400} rows={["cl", "iq", "pw", "im", "eg"].map((id) => { const I = BY[id as keyof typeof BY]; return { id: I.id, label: I.short, v: I.hours.v, hi: I.hours.hi ?? null, tx: I.hours.txt }; })} />
            <p className="eyebrow mb-4 mt-10 !text-slate-500">Weekly rhythm</p>
            <div className="card overflow-x-auto p-4">
              <div className="grid min-w-[520px] grid-cols-[80px_repeat(7,1fr)_1.6fr] items-center gap-1.5 text-xs">
                <span />{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <span key={d} className="text-center font-semibold text-slate-500">{d}</span>)}<span />
                {rhythm.map(([id, days, t]) => (
                  <div key={id} className="contents">
                    <span className="font-semibold">{BY[id].short}</span>
                    {days.map((v, i) => <span key={i} className={`grid h-7 place-items-center rounded-md font-bold ${v === 2 ? "bg-brand-600 text-white" : v ? "bg-brand-200" : "bg-slate-100"}`}>{v === 2 ? "×2" : ""}</span>)}
                    <span className="text-slate-500">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ScoreStrip k="fac" />
      </Band>

      {/* 03 recorded */}
      <Band>
        <SectionHeading n="03" eyebrow="Recorded" title="Recorded content" lede={TAKE.rec} />
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div><p className="eyebrow mb-4 !text-slate-500">Published in hours</p><HBars max={650} rows={["im", "eg", "pw"].map((id) => { const I = BY[id as keyof typeof BY]; return { id: I.id, label: I.short, v: I.rec.v, tx: I.rec.txt }; })} /></div>
          <div><p className="eyebrow mb-4 !text-slate-500">Published in videos or sessions</p><HBars max={1500} rows={["iq", "cr", "cl", "ti"].map((id) => { const I = BY[id as keyof typeof BY]; return { id: I.id, label: I.short, v: I.rec.v, tx: I.rec.txt }; })} /><p className="mt-4 text-xs text-slate-500">Rodha gives no count or hours for its Concept Capsules.</p></div>
        </div>
        <ScoreStrip k="rec" />
      </Band>

      {/* 04 practice */}
      <Band alt>
        <SectionHeading n="04" eyebrow="Practice" title="Practice" lede={TAKE.pra} />
        <div className="mt-10"><HBars max={25500} rows={pra} /></div>
        <ScoreStrip k="pra" />
      </Band>

      {/* 05 doubts */}
      <Band>
        <SectionHeading n="05" eyebrow="Doubts" title="Doubt solving" lede={TAKE.dou} />
        <div className="mt-10">
          <Table head={["Institute", "24×7", "Stated reply time", "Channel", "Who answers"]}>
            {INST.map((I) => { const st = !I.doubt.resp.startsWith("Not stated"); return (
              <tr key={I.id}><td><Name I={I} /></td><td>{I.doubt.x247 ? <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">24×7</span> : "—"}</td><td className={st ? "font-semibold" : "text-slate-400"}>{I.doubt.resp}</td><td>{I.doubt.ch}</td><td>{I.doubt.who}</td></tr>
            ); })}
          </Table>
        </div>
        <ScoreStrip k="dou" />
      </Band>

      {/* 06 mocks */}
      <Band alt>
        <SectionHeading n="06" eyebrow="Mocks" title="Mock tests" lede={TAKE.moc} />
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4 !text-slate-500">Test series: full mocks and sectionals</p>
            <div className="card p-5">
              <div className="flex h-56 items-end justify-around gap-3 border-b border-slate-200">
                {mk.map((I) => (
                  <div key={I.id} className="flex h-full flex-1 items-end justify-center gap-1">
                    {[[I.mocks.full, "#3ba4f0"], [I.mocks.sect, "#fb7185"]].map(([v, c], j) => (
                      <div key={j} className="flex h-full w-5 flex-col items-center justify-end sm:w-6"><span className="mb-1 text-[10px] font-semibold tabular-nums">{(v as number | null) ? `${v}${j && I.id === "pw" ? "+" : ""}` : "–"}</span><span className="w-full rounded-t-md" style={{ height: `${(((v as number) || 0) / 45) * 80}%`, background: c as string }} /></div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-around text-xs font-semibold">{mk.map((I) => <span key={I.id}>{I.short}</span>)}</div>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500"><span className="flex items-center gap-1.5"><i className="h-3 w-3 rounded bg-brand-500" />Full mocks</span><span className="flex items-center gap-1.5"><i className="h-3 w-3 rounded bg-rose-400" />Sectionals</span><span>Elites Grid and Rodha publish no counts.</span></div>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-4 !text-slate-500">How close to CAT</p>
            <Table head={["Institute", "Series", "Closeness"]}>
              {INST.map((I) => <tr key={I.id}><td><Name I={I} short /></td><td>{I.mocks.pkg}</td><td>{CLOSE[I.mocks.close]}</td></tr>)}
            </Table>
          </div>
        </div>
        <ScoreStrip k="moc" />
      </Band>

      {/* 07 app */}
      <Band>
        <SectionHeading n="07" eyebrow="App" title="App & dashboard" lede={TAKE.app} />
        <div className="mt-10"><Table head={["Institute", "Apps and main features"]}>{INST.map((I) => <tr key={I.id}><td><Name I={I} /></td><td>{I.app}</td></tr>)}</Table></div>
        <ScoreStrip k="app" />
      </Band>

      {/* 08 content */}
      <Band alt>
        <SectionHeading n="08" eyebrow="Content" title="Content quality" lede={TAKE.con} />
        <div className="mt-10"><Table head={["Institute", "Basic and advanced content", "PYQs"]}>{INST.map((I) => <tr key={I.id}><td><Name I={I} /></td><td>{I.content}</td><td>{I.pyq}</td></tr>)}</Table></div>
        <ScoreStrip k="con" />
      </Band>

      {/* 09 community */}
      <Band>
        <SectionHeading n="09" eyebrow="Community" title="Community" lede={TAKE.com} />
        <div className="card mt-10 overflow-x-auto p-4">
          <div className="grid min-w-[620px] items-center gap-y-2" style={{ gridTemplateColumns: `140px repeat(${CHANNELS.length}, 1fr)` }}>
            <span />{CHANNELS.map((c) => <span key={c} className="text-center text-xs font-semibold text-slate-500">{c}</span>)}
            {INST.map((I) => (
              <div key={I.id} className="contents">
                <Name I={I} short />
                {I.chan.map((v, i) => <span key={i} className="flex justify-center"><i className={`h-4 w-4 rounded-full ${v ? "bg-brand-600" : "ring-2 ring-inset ring-slate-200"}`} /></span>)}
              </div>
            ))}
          </div>
        </div>
        <ScoreStrip k="com" />
      </Band>

      {/* 10 mentorship */}
      <Band alt>
        <SectionHeading n="10" eyebrow="Mentorship" title="Mentorship" lede={TAKE.men} />
        <div className="mt-10">
          <HBars max={7} rows={[...INST].sort((a, b) => (b.mentor.n || 0) - (a.mentor.n || 0)).map((I) => ({ id: I.id, label: I.short, v: I.mentor.n, tx: I.mentor.n ? <><b className="text-slate-900">{I.mentor.txt.match(/^(Up to )?\d+/)![0]}</b>{I.mentor.txt.replace(/^(Up to )?\d+/, "")}</> : I.mentor.txt }))} />
        </div>
        <ScoreStrip k="men" />
      </Band>
    </>
  );
}
