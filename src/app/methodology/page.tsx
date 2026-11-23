import type { Metadata } from "next";
import { BANDS, INST, PAGES, PARAMS, RUB, site, tpl } from "@/lib/coaching";
import { RatingPill } from "@/components/ScoreBadge";

const M = PAGES.methodology;
export const metadata: Metadata = { title: M.metaTitle, description: M.metaDescription };

export default function Methodology() {
  return (
    <>
      <section className="bg-ink py-16 text-white sm:py-20">
        <div className="container-x">
          <p className="eyebrow !text-brand-300">{M.eyebrow}</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">{M.title}</h1>
          <p className="mt-5 max-w-2xl text-base text-slate-600">{tpl(M.lede)}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-600">
            {BANDS.map(([v, l]) => (<span key={l} className="flex items-center gap-2"><RatingPill v={v} />{l}</span>))}
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-14">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-2">
            {PARAMS.map((p, i) => (
              <article key={p.k} className="card p-6">
                <h2 className="flex items-center gap-3 text-lg font-bold tracking-tight"><span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-sm font-bold text-brand-700">{i + 1}</span>{p.n}</h2>
                <ul className="mt-4 space-y-4">
                  {RUB[p.k].map((c) => (
                    <li key={c.l} className="text-sm">
                      <p className="font-semibold text-slate-900">{c.l} <span className="font-normal text-slate-500">· {c.max ? `up to ${c.max}` : "points taken off"}</span></p>
                      <p className="mt-1 leading-relaxed text-slate-600">{c.lv.map((l) => `${l[1]} (${l[0]})`).join(" · ")}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-sm text-slate-500">
            {tpl(M.sources)} <a className="font-medium text-brand-600 underline" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> · {INST.length} institutes covered.
          </p>
        </div>
      </section>
    </>
  );
}
