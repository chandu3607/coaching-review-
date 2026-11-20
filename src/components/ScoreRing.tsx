import { f1 } from "@/lib/coaching";

const tone = (v: number): [string, string] => (v >= 8 ? ["#34d399", "#22d3ee"] : v >= 6.5 ? ["#38bdf8", "#818cf8"] : v >= 5 ? ["#fbbf24", "#fb923c"] : ["#fb7185", "#f472b6"]);

/** Animated circular score (0–10). `id` must be unique on the page. */
export function ScoreRing({ value, size = 96, stroke = 8, id, caption, textClass = "text-2xl" }: { value: number; size?: number; stroke?: number; id: string; caption?: string; textClass?: string }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, [a, b] = tone(value);
  return (
    <div className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }} role="img" aria-label={`${f1(value)} out of 10`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <defs><linearGradient id={`ring-${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient></defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={`url(#ring-${id})`} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / 10)}
          style={{ "--c": c, animation: "ring 1.4s cubic-bezier(.2,.7,.2,1) both", filter: `drop-shadow(0 0 6px ${a}66)` } as React.CSSProperties} />
      </svg>
      <div className="absolute text-center leading-none">
        <div className={`${textClass} font-bold tabular-nums text-white`}>{f1(value)}</div>
        {caption && <div className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-slate-500">{caption}</div>}
      </div>
    </div>
  );
}
