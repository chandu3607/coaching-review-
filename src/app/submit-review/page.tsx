import type { Metadata } from "next";
import { ReviewForm } from "@/components/ReviewForm";

export const metadata: Metadata = { title: "Submit a review" };

export default function SubmitReview({ searchParams }: { searchParams: { inst?: string } }) {
  return (
    <>
      <section className="bg-ink py-16 text-white sm:py-20">
        <div className="container-x">
          <p className="eyebrow !text-brand-300">Submit a review</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">Studied at a CAT coaching? Help the next batch choose.</h1>
          <p className="mt-5 max-w-2xl text-base text-slate-600">It takes two minutes, and you don’t need to sign up. Reviews like yours appear next to the scores on each coaching’s page.</p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">{["Checked before it’s published", "Your email is never shown", "Same rules for every coaching"].map((t) => <li key={t} className="flex gap-2"><span className="text-emerald-400">✓</span>{t}</li>)}</ul>
        </div>
      </section>
      <section className="py-14 sm:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1.5fr_.8fr]">
          <ReviewForm preselect={searchParams.inst} />
          <aside className="space-y-6 text-sm text-slate-600 lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <p className="eyebrow !text-slate-500">What makes a useful review</p>
              <ul className="mt-3 list-disc space-y-2 pl-5"><li>Say which batch and year you were in.</li><li>Name what you actually used: classes, mocks, doubts, material.</li><li>Give one example, good or bad.</li><li>Say who it suits, and who it doesn’t.</li></ul>
              <p className="eyebrow mt-6 !text-slate-500">What we don’t publish</p>
              <ul className="mt-3 list-disc space-y-2 pl-5"><li>Abuse or personal attacks</li><li>Phone numbers, emails or other personal details</li><li>Reviews written for or by a coaching</li></ul>
            </div>
            <p className="text-xs text-slate-500">We read every review before we publish it next to the Reddit themes on each coaching’s page. Reviews don’t change the scores, which come from published information.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
