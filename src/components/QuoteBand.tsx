export function QuoteBand({ lead, hl, caption, tone = "light" }: { lead: string; hl: string; caption: string; tone?: "light" | "dark" }) {
  return (
    <section className={tone === "dark" ? "bg-gradient-to-br from-brand-700 via-brand-600 to-violet-600 text-white" : "bg-surface-raised text-slate-900"}>
      <div className="container-x py-12 sm:py-14">
        <figure className="max-w-4xl">
          <blockquote className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
            “{lead} <span className={tone === "dark" ? "text-sky-200" : "text-brand-600"}>{hl}</span>”
          </blockquote>
          <figcaption className={`mt-5 text-base sm:text-base ${tone === "dark" ? "text-brand-100" : "text-slate-600"}`}>{caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
