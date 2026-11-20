import { rating } from "@/lib/coaching";

export function RatingPill({ v, className = "" }: { v: number; className?: string }) {
  const r = rating(v);
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${r.cls} ${className}`}>{r.label}</span>;
}

export function Bar({ value, max = 10, className = "bg-brand-500", delay = 0 }: { value: number; max?: number; className?: string; delay?: number }) {
  return (
    <span className="block h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <span
        className={`block h-full origin-left animate-grow rounded-full ${className}`}
        style={{ width: `${Math.min(100, (value / max) * 100)}%`, animationDelay: `${delay}s` }}
      />
    </span>
  );
}
