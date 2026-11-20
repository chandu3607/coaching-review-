import { REDDIT, type Institute } from "@/lib/coaching";
import { ShotGrid } from "./Lightbox";

function Meter({ k, n, tone }: { k: number; n: number; tone: "neg" | "pos" }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${k} of ${n}`}>
      {Array.from({ length: n }, (_, i) => <i key={i} className={`h-2 w-2.5 rounded-sm ${i < k ? (tone === "neg" ? "bg-rose-500/100" : "bg-emerald-500") : "bg-slate-200"}`} />)}
    </span>
  );
}

export function RedditPanel({ I }: { I: Institute }) {
  const R = REDDIT[I.id];
  if (!R) {
    return (
      <div className="card p-6">
        <p className="eyebrow !text-slate-500">What students say on Reddit</p>
        <p className="mt-3 text-slate-600">We haven’t summed up Reddit posts about {I.name} yet. When we do, it will follow the same format as the others: the main themes, how many students raised each one, and what they liked.</p>
      </div>
    );
  }
  const col = (title: string, rows: [string, number, string][], tone: "neg" | "pos") => (
    <div>
      <p className={`mb-3 text-sm font-bold ${tone === "neg" ? "text-rose-300" : "text-emerald-300"}`}>{title}</p>
      {rows.length === 0 ? <p className="text-sm italic text-slate-500">None of these {R.n} posts raised a problem.</p> : (
        <ul className="space-y-4">
          {rows.map((r) => (
            <li key={r[0]} className="rounded-xl bg-slate-50 p-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1"><b className="text-sm text-slate-900">{r[0]}</b><Meter k={r[1]} n={R.n} tone={tone} /><span className="text-xs tabular-nums text-slate-500">{r[1]} of {R.n}</span></div>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{r[2]}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  return (
    <div className="card p-6 sm:p-8">
      <p className="eyebrow !text-slate-500">What students say on Reddit</p>
      <p className="mt-2 max-w-3xl text-slate-600">{R.n} posts and comments about {I.name} on {R.src}, {R.when}. We have put the themes in our own words, and the bars show how many of the {R.n} raised each one.</p>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">{col("Problems students raised", R.minus, "neg")}{col("What they liked", R.plus, "pos")}</div>
      {R.shots && (
        <div className="mt-10">
          <p className="mb-4 text-sm font-bold text-slate-900">The posts behind these themes · click to read</p>
          <ShotGrid shots={R.shots.map((s, i) => ({ src: `/images/rd-${I.id}-${i + 1}.jpg`, title: s[0], caption: `${s[1]} Username hidden.`, alt: `Screenshot of a Reddit ${s[0].toLowerCase()} about ${I.name}: ${s[1]}` }))} />
        </div>
      )}
      <p className="mt-6 text-xs text-slate-500">These posts were shared with us as screenshots. They are not a survey, so they don’t change the scores. The experiences are the students’ own, and we have not checked them. Usernames and profile pictures are hidden.</p>
    </div>
  );
}
