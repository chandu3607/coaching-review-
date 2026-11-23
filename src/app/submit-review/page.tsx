import type { Metadata } from "next";
import { ReviewForm } from "@/components/ReviewForm";
import { PAGES } from "@/lib/coaching";

const S = PAGES.submitReview;
export const metadata: Metadata = { title: S.metaTitle };

export default function SubmitReview({ searchParams }: { searchParams: { inst?: string } }) {
  return (
    <>
      <section className="bg-ink py-16 text-white sm:py-20">
        <div className="container-x">
          <p className="eyebrow !text-brand-300">{S.eyebrow}</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">{S.title}</h1>
          <p className="mt-5 max-w-2xl text-base text-slate-600">{S.lede}</p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">{S.promises.map((t) => <li key={t} className="flex gap-2"><span className="text-emerald-400">✓</span>{t}</li>)}</ul>
        </div>
      </section>
      <section className="py-14 sm:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1.5fr_.8fr]">
          <ReviewForm preselect={searchParams.inst} />
          <aside className="space-y-6 text-sm text-slate-600 lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <p className="eyebrow !text-slate-500">{S.usefulTitle}</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">{S.usefulTips.map((t) => <li key={t}>{t}</li>)}</ul>
              <p className="eyebrow mt-6 !text-slate-500">{S.notPublishedTitle}</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">{S.notPublished.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            <p className="text-xs text-slate-500">{S.footnote}</p>
          </aside>
        </div>
      </section>
    </>
  );
}
