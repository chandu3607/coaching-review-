import Link from "next/link";
import { GLANCE, GLANCE_NOTE, HOME, INST, tpl } from "@/lib/coaching";
import { LogoBox } from "./Logo";

export function Glance() {
  return (
    <section id="glance" className="scroll-mt-20 bg-ink py-20 text-white sm:py-24">
      <div className="container-x grid gap-10">
        <div>
          <p className="eyebrow !text-brand-300"><span className="mr-2">03</span>At a glance</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{HOME.glance.title}</h2>
          <p className="mt-3 text-slate-600">{tpl(HOME.glance.lede)}</p>
        </div>

        <div>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[.04] p-4 sm:p-6">
            <table className="w-full min-w-[720px] border-separate border-spacing-y-1 text-xs">
              <thead>
                <tr>
                  <th />
                  {GLANCE.map((g) => (
                    <th key={g} className="h-32 w-10 align-bottom"><span className="inline-block origin-bottom-left -rotate-[55deg] whitespace-nowrap pl-1 text-left text-[11px] font-medium text-slate-600">{g}</span></th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INST.map((I) => (
                  <tr key={I.id}>
                    <th scope="row" className="pr-3 text-left">
                      <Link href={`/institutes/${I.id}`} className="flex items-center gap-2 font-medium text-slate-800 hover:text-white"><LogoBox I={I} s={20} w={50} dark /><span className="hidden whitespace-nowrap sm:inline">{I.name}</span></Link>
                    </th>
                    {I.glance.map((v, c) => {
                      const word = v === 1 ? "Yes" : v === 0.5 ? "Partly" : "Not published or not offered";
                      const note = GLANCE_NOTE[`${I.id}-${c}`];
                      return (
                        <td key={c} className="text-center">
                          <span
                            tabIndex={0}
                            title={`${I.name} · ${GLANCE[c]}: ${word}${note ? ` — ${note}` : ""}`}
                            aria-label={`${I.name}, ${GLANCE[c]}: ${word}${note ? `. ${note}` : ""}`}
                            className={`inline-block h-5 w-5 rounded-md transition hover:scale-125 ${v === 1 ? "bg-brand-400" : v === 0.5 ? "bg-gradient-to-r from-brand-400 from-50% to-white/10 to-50%" : "bg-white/10"}`}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap gap-5 text-xs text-slate-400">
            <span className="flex items-center gap-2"><i className="h-3 w-3 rounded bg-brand-400" />Yes</span>
            <span className="flex items-center gap-2"><i className="h-3 w-3 rounded bg-gradient-to-r from-brand-400 from-50% to-white/10 to-50%" />Partly</span>
            <span className="flex items-center gap-2"><i className="h-3 w-3 rounded bg-white/10" />Not published / not offered</span>
          </div>
        </div>
      </div>
    </section>
  );
}
