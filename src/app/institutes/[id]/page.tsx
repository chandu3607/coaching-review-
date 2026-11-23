import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AVG, BACKING, BY, INST, PARAMS, PIC, RANKED, RESULTS_SHOTS, SHOTS, USP, WHY, cap, f1, fmt, ord, type InstId } from "@/lib/coaching";
import { LogoTile } from "@/components/Logo";
import { RatingPill } from "@/components/ScoreBadge";
import { ScoreRing } from "@/components/ScoreRing";
import { RadarChart } from "@/components/RadarChart";
import { SectionHeading } from "@/components/SectionHeading";
import { RedditPanel } from "@/components/RedditPanel";
import { ShotGrid } from "@/components/Lightbox";
import { RubricAccordion } from "@/components/Rubric";

export function generateStaticParams() { return INST.map((I) => ({ id: I.id })); }
export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const I = BY[params.id as InstId];
  return I ? { title: `${I.name} review & scores`, description: PIC[I.id][0] } : {};
}

export default function InstitutePage({ params }: { params: { id: string } }) {
  const I = BY[params.id as InstId];
  if (!I) notFound();
  const rank = RANKED.indexOf(I) + 1;
  const idx = INST.indexOf(I);
  const prev = INST[(idx + INST.length - 1) % INST.length], next = INST[(idx + 1) % INST.length];
  const m = I.mocks;
  const SH = SHOTS[I.id];
  const RS = RESULTS_SHOTS[I.id];
  const usp = USP[I.id] ?? [];
  let n = 0; const num = () => String(++n).padStart(2, "0");

  const facts = [
    { v: I.claim ? fmt(I.claim) + (/\+/.test(I.claimTxt) ? "+" : "") : "No 2025 figure", l: `CAT 2025 99+ claim · ${BACKING[I.backing][0]}`, big: !!I.claim },
    { v: I.practice.v ? I.practice.txt.replace(" DPPs", "").replace(" Flexi · ", "–").replace(" live", "") : "Not published", l: "practice questions", big: !!I.practice.v },
    { v: m.full ? `${m.full}${m.sect ? ` + ${m.sect}` : ""}` : "Not published", l: "mocks + sectionals", big: !!m.full },
    { v: I.doubt.resp.replace(" (app page)", ""), l: `stated doubt reply${I.doubt.x247 ? " · 24×7" : ""}`, big: false },
  ];

  return (
    <>
      {/* hero */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image src={`/images/inst-${I.id}.jpg`} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/50" />
        <div className="container-x py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-400"><Link href="/" className="hover:text-white">Home</Link> / Institutes / <span className="text-white">{I.name}</span></nav>
          <div className="mt-8 flex flex-wrap items-center gap-8">
            <LogoTile I={I} size={132} alt dark />
            <div className="min-w-0 flex-1 basis-80">
              <p className="eyebrow !text-brand-300">Institute profile · Rank {rank} of {INST.length} · Not final</p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">{I.name}</h1>
              <p className="mt-3 max-w-xl text-base text-slate-600">{PIC[I.id][0]}</p>
            </div>
            <div className="glass gborder flex flex-col items-center rounded-3xl px-7 py-5 text-center">
              <ScoreRing value={I.o} size={118} stroke={9} id="inst-hero" textClass="text-3xl" caption="overall" />
              <div className="mt-3"><RatingPill v={I.o} /></div>
            </div>
          </div>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.l} className="bg-ink/80 p-5 backdrop-blur">
                <dd className={`font-extrabold tabular-nums ${f.big ? "text-3xl" : "pt-2 text-base"}`}>{f.v}</dd>
                <dt className="mt-1 text-xs text-slate-400">{f.l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* USP */}
      {usp.length > 0 && (() => {
        let k = 0;
        const screens = usp.filter((u) => u[0] && SH).map((u) => ({ n: ++k, it: SH!.items[u[0] - 1], src: u[3] ? `/${u[3]}` : `/images/app-${I.id}-${u[0]}.jpg` }));
        k = 0;
        return (
          <section className="bg-surface py-12 sm:py-14">
            <div className="container-x grid items-start gap-12 lg:grid-cols-[1fr_1fr]">
              <div>
                <p className="eyebrow">What it stands out for</p>
                <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">{PIC[I.id][0]}</h2>
                <ol className="mt-8 space-y-5">
                  {usp.map((u) => {
                    const has = !!(u[0] && SH);
                    if (has) k++;
                    return (
                      <li key={u[1]} className="flex gap-4">
                        <span aria-hidden className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${has ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-500"}`}>{has ? k : "+"}</span>
                        <div><b className="block text-base tracking-tight">{u[1]}</b><span className="text-slate-600">{u[2]}</span></div>
                      </li>
                    );
                  })}
                </ol>
                <p className="mt-8 text-xs text-slate-500">These points come from our comparison of all eight coachings. They are the institute’s own claims, unless we say students said them.</p>
              </div>
              <div>
                {screens.length > 0 ? (
                  <>
                    <ShotGrid kind={SH!.kind} shots={screens.map((x) => ({ src: x.src, title: `${x.n}. ${x.it[0]}`, caption: x.it[1], alt: `${I.name} screen: ${x.it[0]}` }))} />
                    <p className="mt-4 text-xs text-slate-500">{SH!.showcase ? "Screens from " : "Real screens from "}{SH!.src}. Click a screen to see it bigger.</p>
                  </>
                ) : (
                  <>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink shadow-card"><Image src={`/images/inst-${I.id}.jpg`} alt={PIC[I.id][1]} fill sizes="50vw" className="object-cover" /></div>
                    <p className="mt-3 text-xs text-slate-500">An illustration, not a photo of the institute.</p>
                  </>
                )}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ten scores */}
      <section className="py-12 sm:py-14">
        <div className="container-x grid gap-10 lg:grid-cols-[1.5fr_.9fr]">
          <div>
            <SectionHeading n={num()} eyebrow="Scores" title="Its ten scores" lede="Out of 10, and not final yet. The dark tick shows the average of all eight." />
            <div className="mt-8 space-y-2">
              {I.sc.map((v, i) => {
                const rk = 1 + INST.filter((J) => J.sc[i] > v).length, best = rk === 1;
                return (
                  <div key={i} className="card grid items-center gap-x-5 gap-y-2 p-4 sm:grid-cols-[1.1fr_1.2fr_auto]">
                    <div>
                      <p className="font-semibold">{PARAMS[i].n}</p>
                      <p className="mt-0.5 text-sm leading-snug text-slate-500">{WHY[PARAMS[i].k][I.id]}</p>
                    </div>
                    <div>
                      <div className="relative h-3 rounded-full bg-slate-100">
                        <div className={`h-full origin-left animate-grow rounded-full ${best ? "bg-gradient-to-r from-emerald-400 to-sky-400" : "bg-brand-500"}`} style={{ width: `${Math.max(v, 0.2) * 10}%`, animationDelay: `${i * 0.06}s` }} />
                        <span className="absolute -top-1 h-5 w-0.5 rounded bg-white/80" style={{ left: `${AVG[i] * 10}%` }} title={`Average ${f1(AVG[i])}`} />
                      </div>
                      <p className="mt-1.5 text-xs text-slate-500">{best ? <b className="rounded-full bg-amber-500/15 px-2 py-0.5 text-amber-300">Best of {INST.length}</b> : `${ord(rk)} of ${INST.length} · avg ${f1(AVG[i])}`}</p>
                    </div>
                    <span className="text-right text-2xl font-extrabold tabular-nums">{f1(v)}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card flex flex-col items-center p-6">
              <p className="eyebrow !text-slate-500">Shape</p>
              <RadarChart values={I.sc} size={300} labels avg />
              <p className="mt-2 text-xs text-slate-500">Dashed line: average of all eight.</p>
            </div>
          </aside>
        </div>
      </section>

      {/* at a glance */}
      <section className="bg-ink py-16 text-white sm:py-20">
        <div className="container-x">
          <SectionHeading dark n={num()} eyebrow="At a glance" title="At a glance" lede={`What ${I.name} does well, what to watch out for, and what students say about it.`} />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {([["Stands out for", I.stand, "✓", "emerald"], ["Watch out for", I.watch, "!", "amber"]] as const).map(([k, str, icon, tone]) => (
              <div key={k} className={`rounded-3xl border p-6 ${tone === "emerald" ? "border-emerald-400/20 bg-emerald-400/5" : "border-amber-400/20 bg-amber-400/5"}`}>
                <p className={`text-xs font-bold uppercase tracking-[0.16em] ${tone === "emerald" ? "text-emerald-300" : "text-amber-300"}`}>{k}</p>
                <ul className="mt-4 space-y-3">
                  {str.split("; ").map((x) => (
                    <li key={x} className="flex gap-3 font-medium"><span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-sm font-bold text-ink ${tone === "emerald" ? "bg-emerald-300" : "bg-amber-300"}`}>{icon}</span>{cap(x)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-10 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">What students say · in our words, not checked</p>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <blockquote className="flex gap-3 rounded-2xl bg-white/5 p-5"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-300 font-bold text-ink" aria-label="Liked">+</span><p>{I.voice.p}</p></blockquote>
            <blockquote className="flex gap-3 rounded-2xl bg-white/5 p-5"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-rose-300 font-bold text-ink" aria-label="Disliked">−</span><p>{I.voice.m}</p></blockquote>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14">
        <div className="container-x space-y-6">
          <RedditPanel I={I} />
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-brand-200 bg-brand-50 p-6 sm:flex-row sm:items-center">
            <p className="text-base"><b>Studied at {I.name}?</b> Tell the next batch what it was really like.</p>
            <Link href={`/submit-review?inst=${I.id}`} className="btn btn-dark">Submit your review →</Link>
          </div>
        </div>
      </section>

      {SH && (
        <section className="bg-surface py-12 sm:py-14">
          <div className="container-x">
            <SectionHeading n={num()} eyebrow="Product" title="Inside the product" lede={`${SH.showcase ? `Screens from ${SH.src}. We did not take these ourselves.` : `Real screens from ${SH.src}.`} Click one to see it bigger.`} />
            <div className="mt-8">
              <ShotGrid kind={SH.kind} shots={SH.items.map((it, i) => ({ src: `/images/app-${I.id}-${i + 1}.jpg`, title: it[0], caption: it[1], alt: `${I.name} screen: ${it[0]}` }))} />
            </div>
            {SH.extra && (
              <>
                <h3 className="mb-6 mt-14 text-xl font-bold tracking-tight">{SH.extra.title}</h3>
                <ShotGrid kind={SH.extra.kind} shots={SH.extra.items.map((it, i) => ({ src: `/images/app-${I.id}-${SH.extra!.prefix}${i + 1}.jpg`, title: it[0], caption: it[1], alt: `${I.name} screen: ${it[0]}` }))} />
              </>
            )}
            <p className="mt-8 text-xs text-slate-500">{SH.showcase ? "Taken from " : "Screenshots from "}{SH.src}, November 2026. Names and photos are blurred. The screens show the product, but they don’t change the scores, which come only from published information.</p>
          </div>
        </section>
      )}

      {RS && (
        <section className="py-12 sm:py-14">
          <div className="container-x">
            <SectionHeading n={num()} eyebrow="Results" title="Its results page" lede={RS.lede} />
            <div className="mt-8"><ShotGrid shots={RS.items.map((it, i) => ({ src: `/images/res-${I.id}-${i + 1}.jpg`, title: it[0], caption: it[1], alt: `${I.name} results page: ${it[0]}` }))} /></div>
            <p className="mt-6 text-xs text-slate-500">Screenshots from the {I.name} website, November 2026. We have blurred the students’ names and photos. We could not check these results ourselves.</p>
          </div>
        </section>
      )}

      <section className="bg-surface py-12 sm:py-14">
        <div className="container-x">
          <SectionHeading n={num()} eyebrow="Method" title="How we scored it" lede="Every point follows a fixed rule. Open an area to see how its score adds up." />
          <div className="mt-8 max-w-4xl"><RubricAccordion I={I} /></div>
        </div>
      </section>

      <section className="py-12 sm:py-14">
        <div className="container-x">
          <SectionHeading n={num()} eyebrow="Compare" title="The other seven" />
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
            {INST.filter((J) => J !== I).map((J) => (
              <Link key={J.id} href={`/institutes/${J.id}`} className="card flex flex-col items-center gap-3 p-5 text-center transition hover:-translate-y-1 hover:shadow-glow">
                <LogoTile I={J} size={64} />
                <span className="text-sm font-semibold">{J.name}</span>
                <span className="text-xl font-extrabold tabular-nums text-brand-700">{f1(J.o)}</span>
                <RatingPill v={J.o} />
              </Link>
            ))}
          </div>
          <div className="mt-10 flex justify-between text-sm font-semibold text-brand-700">
            <Link href={`/institutes/${prev.id}`} className="hover:underline">← {prev.name}</Link>
            <Link href={`/institutes/${next.id}`} className="hover:underline">{next.name} →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
