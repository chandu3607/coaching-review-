import Link from "next/link";
import { BY, type InstId } from "@/lib/coaching";
import { Logo } from "./Logo";

export interface HRow {
  id?: InstId; label: string; href?: string; v: number | null; hi?: number | null;
  tx: React.ReactNode; sub?: React.ReactNode; color?: string; color2?: string;
}

/** Horizontal bar rows with optional logo, range (v→hi) and sub-label. */
export function HBars({ rows, max, className = "" }: { rows: HRow[]; max?: number; className?: string }) {
  const m = max ?? Math.max(...rows.map((r) => r.hi ?? r.v ?? 0));
  return (
    <div className={`grid grid-cols-[minmax(84px,128px)_1fr] items-center gap-x-4 gap-y-3.5 sm:grid-cols-[150px_1fr] ${className}`}>
      {rows.map((r, i) => {
        const inner = (
          <span className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
            {r.id && <span className="flex w-14 shrink-0 justify-start"><Logo I={BY[r.id]} s={20} /></span>}
            <span className={r.id ? "hidden truncate sm:inline" : ""}>{r.label}</span>
          </span>
        );
        return (
          <div key={r.label + i} className="contents">
            {r.href ? <Link href={r.href} className="hover:text-brand-600">{inner}</Link> : inner}
            {r.v === null ? (
              <span className="text-sm italic text-slate-400">{r.tx}</span>
            ) : (
              <div className="flex items-center gap-3">
                <span className="flex h-3 min-w-[6px] overflow-hidden rounded-full bg-slate-100" style={{ width: `${(((r.hi ?? r.v) as number) / m) * 62}%` }}>
                  <span className="h-full origin-left animate-grow" style={{ width: r.hi ? `${(r.v / r.hi) * 100}%` : "100%", background: r.color ?? "#3ba4f0", animationDelay: `${i * 0.06}s` }} />
                  {r.hi ? <span className="h-full flex-1" style={{ background: r.color2 ?? "#133a5f" }} /> : null}
                </span>
                <span className="min-w-0 text-sm text-slate-700">
                  {r.tx}
                  {r.sub && <span className="block text-xs text-slate-500">{r.sub}</span>}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
