import { INST, PARAMS, PIDX, WHY, f1, type ParamKey } from "@/lib/coaching";
import { HBars } from "./HBars";

export function ScoreStrip({ k }: { k: ParamKey }) {
  const i = PIDX[k];
  const rows = [...INST].sort((a, b) => b.sc[i] - a.sc[i]);
  return (
    <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-100/60 p-5 sm:p-6">
      <p className="eyebrow mb-4 !text-slate-500">Scores for {PARAMS[i].n}</p>
      <HBars max={10} rows={rows.map((I) => ({ id: I.id, label: I.name, href: `/institutes/${I.id}`, v: Math.max(I.sc[i], 0.15), tx: <b className="text-slate-900">{f1(I.sc[i])}</b>, sub: WHY[k][I.id], color: I.sc[i] >= 8 ? "#10b981" : I.sc[i] >= 5 ? "#3ba4f0" : "#3a455c" }))} />
    </div>
  );
}
