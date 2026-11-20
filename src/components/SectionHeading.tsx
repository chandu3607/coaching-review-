export function SectionHeading({ n, eyebrow, title, lede, dark = false, className = "" }: { n?: string; eyebrow?: string; title: React.ReactNode; lede?: React.ReactNode; dark?: boolean; className?: string }) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {(n || eyebrow) && (
        <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-300">
          {n && <span className="rounded-md border border-sky-400/30 bg-sky-400/10 px-1.5 py-0.5 font-mono tabular-nums">{n}</span>}
          {eyebrow}
          <span className="h-px w-10 bg-gradient-to-r from-sky-400/50 to-transparent" />
        </p>
      )}
      <h2 className={`mt-3 text-[1.65rem] font-semibold leading-tight tracking-[-0.02em] sm:text-[2rem] ${dark ? "text-white" : "text-slate-900"}`}>{title}</h2>
      {lede && <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{lede}</p>}
    </div>
  );
}
