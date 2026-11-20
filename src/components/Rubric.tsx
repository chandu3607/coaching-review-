import { PARAMS, RUB, WHY, f1, type Institute } from "@/lib/coaching";

export function RubricAccordion({ I }: { I: Institute }) {
  return (
    <div className="space-y-3">
      {PARAMS.map((p, i) => (
        <details key={p.k} className="card group overflow-hidden open:shadow-glow">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold">
            <span>{p.n}</span>
            <span className="flex items-center gap-3"><span className="text-lg font-extrabold tabular-nums text-brand-700">{f1(I.sc[i])}</span><span aria-hidden className="text-slate-400 transition group-open:rotate-180">⌄</span></span>
          </summary>
          <div className="border-t border-slate-100 px-5 py-4">
            <ul className="divide-y divide-slate-100 text-sm">
              {RUB[p.k].map((c) => {
                const lv = c.lv[c.v[I.id]];
                return (
                  <li key={c.l} className="grid grid-cols-[1.2fr_1.4fr_auto] items-center gap-3 py-2.5">
                    <span className="text-slate-600">{c.l}</span>
                    <span className="font-medium text-slate-900">{lv[1]}</span>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 font-semibold tabular-nums text-slate-700">{c.max ? `${lv[0]} / ${c.max}` : lv[0] < 0 ? lv[0] : "0"}</span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-sm text-slate-500">{WHY[p.k][I.id]}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
