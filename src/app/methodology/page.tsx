import type { Metadata } from "next";
import { INST, PARAMS, RUB } from "@/lib/coaching";
import { RatingPill } from "@/components/ScoreBadge";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "How we score", description: "Fixed rules behind every score, the same for all eight institutes." };

export default function Methodology() {
  const nCrit = PARAMS.reduce((t, p) => t + RUB[p.k].length, 0);
  return (
    <>
      <section className="bg-ink py-16 text-white sm:py-20">
        <div className="container-x">
          <p className="eyebrow !text-brand-300">Method</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">How a score is built</h1>
          <p className="mt-5 max-w-2xl text-base text-slate-600">Each area is scored out of 10 using fixed rules, which are all listed below. The same {nCrit} checks apply to every institute, including the one that runs this site. The overall score is a simple average of the ten.</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-600">
            {([[8, "8 and above"], [6.5, "6.5 to 7.9"], [5, "5 to 6.4"], [4, "under 5"]] as const).map(([v, l]) => (<span key={l} className="flex items-center gap-2"><RatingPill v={v} />{l}</span>))}
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
            Sources: each institute’s own course, results, faculty and app pages, and student reviews on Reddit and Careers360, as of {site.checked}. The figures are the institutes’ own, unless we say a CA firm checked them. The scores are not final and will change as institutes update their pages. Spotted an error? <a className="font-medium text-brand-600 underline" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> · {INST.length} institutes covered.
          </p>
        </div>
      </section>
    </>
  );
}
