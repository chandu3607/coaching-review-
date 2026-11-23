import Link from "next/link";
import { CLOSE, HOME, INST, MENTOR_KIND, QUESTIONS, fmt } from "@/lib/coaching";
import { BACKING_COLOR } from "./Claims";
import { LogoBox } from "./Logo";
import { SectionHeading } from "./SectionHeading";

function Row({ I, tag, tagColor, val }: { I: (typeof INST)[number]; tag: string; tagColor: string; val: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 py-2 text-sm">
      <LogoBox I={I} s={20} w={52} />
      <span className="flex min-w-0 flex-1 items-center gap-2 text-slate-600"><i className="h-2 w-2 shrink-0 rounded-full" style={{ background: tagColor }} /><span className="truncate">{tag}</span></span>
      <span className="text-right font-semibold tabular-nums text-slate-900">{val}</span>
    </li>
  );
}
const dim = (t: string) => <span className="font-normal text-slate-400">{t}</span>;

export function Questions() {
  const plus = new Set(INST.filter((I) => /\+/.test(I.claimTxt)).map((I) => I.id as string));
  const topPct = (I: (typeof INST)[number]) => (I.pct.length ? Math.max(...I.pct) : 0);
  const closeCol: Record<string, string> = { closest: "#10b981", close: "#3ba4f0", little: "#94a3b8", harder: "#f43f5e", basic: "#4a566e" };

  const panels: React.ReactNode[] = [
    INST.map((I) => <Row key={I.id} I={I} tag={I.backing === "audited" ? "Checked by a CA" : I.backing === "none" ? "Only 2024 offers checked" : "Not checked"} tagColor={BACKING_COLOR[I.backing]} val={I.claim ? fmt(I.claim) + (plus.has(I.id) ? "+" : "") : dim("no 2025 figure")} />),
    [...INST].sort((a, b) => topPct(b) - topPct(a)).map((I) => <Row key={I.id} I={I} tag={I.pct.length ? `${I.pct.length} ${I.pct.length === 1 ? "lead" : "leads"} published` : "None published"} tagColor={topPct(I) >= 99.99 ? "#f59e0b" : I.pct.length ? "#3ba4f0" : "#4a566e"} val={topPct(I) ? String(topPct(I)) : dim("—")} />),
    INST.map((I) => { const st = !I.doubt.resp.startsWith("Not stated"); return <Row key={I.id} I={I} tag={I.doubt.x247 ? "24×7" : "Fixed hours"} tagColor={I.doubt.x247 ? "#10b981" : "#4a566e"} val={st ? I.doubt.resp.replace(" (app page)", "") : dim("Not stated")} />; }),
    INST.map((I) => <Row key={I.id} I={I} tag={CLOSE[I.mocks.close]} tagColor={closeCol[I.mocks.close]} val={I.mocks.full ? `${I.mocks.full}${I.mocks.sect ? ` + ${I.mocks.sect}` : ""}` : dim("—")} />),
    [...INST].sort((a, b) => (b.mentor.n || 0) - (a.mentor.n || 0)).map((I) => <Row key={I.id} I={I} tag={MENTOR_KIND[I.id]} tagColor={I.mentor.n ? "#f59e0b" : "#4a566e"} val={I.mentor.n ? `${I.mentor.n} sessions` : dim("—")} />),
  ];

  return (
    <section id="questions" className="scroll-mt-20 bg-slate-50 py-14 sm:py-16">
      <div className="container-x">
        <SectionHeading n="05" eyebrow={HOME.questions.eyebrow} title={HOME.questions.title} lede={HOME.questions.lede} />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {QUESTIONS.map((q, k) => (
            <article key={q.t} className={`card p-6 ${k === 4 ? "lg:col-span-2" : ""}`}>
              <div className={k === 4 ? "grid gap-8 lg:grid-cols-2" : ""}>
                <div>
                  <p className="eyebrow">{q.m}</p>
                  <h3 className="mt-2 text-lg font-bold tracking-tight sm:text-xl">{q.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{q.s}</p>
                </div>
                <div className={k === 4 ? "" : "mt-5"}>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">{q.panel}</p>
                  <ul className="divide-y divide-slate-100">{panels[k]}</ul>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl bg-ink p-8 text-white sm:flex-row sm:items-center">
          <p className="text-xl font-extrabold tracking-tight sm:text-2xl">{HOME.questions.closing}</p>
          <Link href="/#scores" className="btn btn-primary">{HOME.questions.closingButton}</Link>
        </div>
      </div>
    </section>
  );
}
