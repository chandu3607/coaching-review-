"use client";
import { useState } from "react";
import { INST, type InstId } from "@/lib/coaching";
import { Logo } from "./Logo";

const ASPECTS: [string, string][] = [["fac", "Faculty"], ["moc", "Mocks"], ["dou", "Doubt solving"], ["mat", "Study material"]];
const YEARS = ["CAT 2027", "CAT 2026", "CAT 2025", "Earlier"];
const MODES = ["Online live", "Classroom", "Recorded / self-paced", "Test series only"];
const RECS = ["Yes", "It depends", "No"];

function Step({ n, title, note, children }: { n: string; title: string; note?: string; children: React.ReactNode }) {
  return (
    <fieldset className="card p-6">
      <legend className="sr-only">{title}</legend>
      <div className="mb-4 flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white">{n}</span><h2 className="text-base font-bold tracking-tight">{title}</h2></div>
      {note && <p className="-mt-2 mb-4 text-sm text-slate-500">{note}</p>}
      <div className="space-y-4">{children}</div>
    </fieldset>
  );
}
function Chips({ opts, value, onChange }: { opts: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {opts.map((o) => <button key={o} type="button" aria-pressed={value === o} onClick={() => onChange(value === o ? "" : o)} className={`chip ${value === o ? "border-brand-600 bg-brand-600 text-white" : "border-slate-300 bg-surface hover:bg-brand-50"}`}>{o}</button>)}
    </div>
  );
}
function Scale({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div role="group" aria-label={`${label}, out of 10`} className="flex flex-wrap gap-1.5">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          aria-pressed={value === n}
          onClick={() => onChange(value === n ? 0 : n)}
          className={`h-9 w-9 rounded-lg text-sm font-semibold tabular-nums transition ${
            n <= value
              ? "bg-brand-600 text-white shadow-sm"
              : "bg-slate-200 text-slate-700 hover:bg-brand-100"
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  );
}
const input = "w-full rounded-xl border border-slate-300 bg-surface px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100";
const Label = ({ t, opt, children }: { t: string; opt?: string; children: React.ReactNode }) => (<label className="block"><span className="mb-1.5 block text-sm font-medium text-slate-800">{t} {opt && <i className="font-normal not-italic text-slate-400">{opt}</i>}</span>{children}</label>);

export function ReviewForm({ preselect }: { preselect?: string }) {
  const [inst, setInst] = useState<string>(preselect && (INST.some((I) => I.id === preselect) || preselect === "other") ? preselect : "");
  const [other, setOther] = useState("");
  const [year, setYear] = useState(""); const [mode, setMode] = useState(""); const [course, setCourse] = useState("");
  const [overall, setOverall] = useState(0); const [asp, setAsp] = useState<Record<string, number>>({});
  const [best, setBest] = useState(""); const [worse, setWorse] = useState(""); const [rec, setRec] = useState("");
  const [name, setName] = useState(""); const [pct, setPct] = useState(""); const [email, setEmail] = useState(""); const [ok, setOk] = useState(false);
  const [err, setErr] = useState(""); const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!inst) return setErr("Choose which coaching you are reviewing.");
    if (inst === "other" && !other.trim()) return setErr("Enter the coaching’s name.");
    if (!overall) return setErr("Give an overall rating out of 10.");
    if ((best + worse).trim().length < 60) return setErr("Write at least 60 characters in total across the two boxes.");
    if (/\b\d{10}\b|@/.test(best + worse)) return setErr("Please remove phone numbers or emails from your review.");
    if (!ok) return setErr("Please confirm this is your own experience.");
    setErr(""); setState("sending");
    try {
      const res = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ inst, other, year, mode, course, overall, aspects: asp, best, worse, rec, name, pct, email }) });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Something went wrong.");
      setState("done");
    } catch (x) { setErr((x as Error).message); setState("idle"); }
  }

  if (state === "done") {
    return (
      <div className="card mx-auto max-w-xl p-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-500/15 text-xl text-emerald-300">✓</div>
        <h2 className="mt-5 text-xl font-bold tracking-tight">Thank you — review received.</h2>
        <p className="mt-2 text-slate-600">We read every review before it’s published. Reviews don’t change the scores, which come from published information.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <Step n="01" title="Which coaching?">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {INST.map((I) => (
            <button key={I.id} type="button" aria-pressed={inst === I.id} onClick={() => setInst(I.id as InstId)} className={`flex h-20 flex-col items-center justify-center gap-1.5 rounded-xl border text-xs font-semibold transition ${inst === I.id ? "border-brand-600 bg-brand-50 ring-2 ring-brand-200" : "border-slate-200 bg-surface hover:border-brand-300"}`}>
              <Logo I={I} s={22} /><span>{I.name}</span>
            </button>
          ))}
          <button type="button" aria-pressed={inst === "other"} onClick={() => setInst("other")} className={`flex h-20 flex-col items-center justify-center gap-1 rounded-xl border border-dashed text-xs font-semibold transition ${inst === "other" ? "border-brand-600 bg-brand-50 ring-2 ring-brand-200" : "border-slate-300 hover:border-brand-300"}`}><span className="text-lg leading-none">+</span>Another coaching</button>
        </div>
        {inst === "other" && <Label t="Coaching name"><input className={input} maxLength={80} value={other} onChange={(e) => setOther(e.target.value)} placeholder="e.g. Unacademy" /></Label>}
      </Step>

      <Step n="02" title="Your batch">
        <div><p className="mb-2 text-sm font-medium">CAT year</p><Chips opts={YEARS} value={year} onChange={setYear} /></div>
        <div><p className="mb-2 text-sm font-medium">How you studied</p><Chips opts={MODES} value={mode} onChange={setMode} /></div>
        <Label t="Course or batch name" opt="optional"><input className={input} maxLength={80} value={course} onChange={(e) => setCourse(e.target.value)} placeholder="e.g. Udaan batch, SimCAT series" /></Label>
      </Step>

      <Step n="03" title="Your ratings">
        <div><p className="mb-2 text-sm font-medium">Overall, out of 10</p><Scale label="Overall" value={overall} onChange={setOverall} /></div>
        <div>
          <p className="mb-3 text-sm font-medium">Rate what you used <i className="font-normal not-italic text-slate-400">optional</i></p>
          <div className="space-y-3">{ASPECTS.map(([k, l]) => (<div key={k} className="grid gap-2 sm:grid-cols-[130px_1fr] sm:items-center"><span className="text-sm text-slate-600">{l}</span><Scale label={l} value={asp[k] || 0} onChange={(v) => setAsp((a) => ({ ...a, [k]: v }))} /></div>))}</div>
        </div>
      </Step>

      <Step n="04" title="In your words" note="Write at least 60 characters in total across the two boxes. Keep it about the course, with no abuse and no phone numbers or emails.">
        <Label t="What was best?"><textarea rows={4} maxLength={1500} className={input} value={best} onChange={(e) => setBest(e.target.value)} placeholder="Be specific: a teacher, the mocks, doubt replies, the material…" /></Label>
        <Label t="What could be better?"><textarea rows={4} maxLength={1500} className={input} value={worse} onChange={(e) => setWorse(e.target.value)} placeholder="What would you warn a friend about?" /></Label>
        <div><p className="mb-2 text-sm font-medium">Would you recommend it?</p><Chips opts={RECS} value={rec} onChange={setRec} /></div>
      </Step>

      <Step n="05" title="About you">
        <div className="grid gap-4 sm:grid-cols-2">
          <Label t="Name to show" opt="optional"><input className={input} maxLength={40} value={name} onChange={(e) => setName(e.target.value)} placeholder="Anonymous student" /></Label>
          <Label t="CAT percentile" opt="optional"><input className={input} type="number" min={0} max={100} step={0.01} inputMode="decimal" value={pct} onChange={(e) => setPct(e.target.value)} placeholder="e.g. 96.4" /></Label>
        </div>
        <Label t="Email for verification" opt="optional, never shown"><input className={input} type="email" maxLength={120} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></Label>
        <label className="flex items-start gap-3 text-sm text-slate-600"><input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-brand-600" /><span>This is my own experience. It may be published after we read it, and we will only edit it for length and clarity.</span></label>
      </Step>

      {err && <p role="alert" className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-300">{err}</p>}
      <button type="submit" disabled={state === "sending"} className="btn btn-primary h-12 w-full text-base disabled:opacity-60 sm:w-auto sm:px-8">{state === "sending" ? "Sending…" : "Submit review →"}</button>
    </form>
  );
}
