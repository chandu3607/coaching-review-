import { PARAMS, AVG } from "@/lib/coaching";

/** 10-axis radar. `values` 0–10. Optional dashed average overlay. */
export function RadarChart({ values, size = 160, labels = false, avg = false, stroke = "#3ba4f0", fill = "rgba(59,164,240,.20)", dark = false }: { values: number[]; size?: number; labels?: boolean; avg?: boolean; stroke?: string; fill?: string; dark?: boolean }) {
  const n = values.length, c = 100, R = labels ? 64 : 86;
  const pt = (i: number, v: number) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [c + Math.cos(a) * R * (v / 10), c + Math.sin(a) * R * (v / 10)] as const;
  };
  const poly = (vals: number[]) => vals.map((v, i) => pt(i, v).join(",")).join(" ");
  const grid = "rgba(255,255,255,.09)";
  return (
    <svg viewBox={labels ? "-30 -4 260 208" : "0 0 200 200"} width={size} height={size} role="img" aria-label="Radar chart of the ten scores" className="shrink-0">
      {[2.5, 5, 7.5, 10].map((r) => (<polygon key={r} points={poly(values.map(() => r))} fill="none" stroke={grid} strokeWidth="1" />))}
      {values.map((_, i) => { const [x, y] = pt(i, 10); return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke={grid} strokeWidth="1" />; })}
      {avg && <polygon points={poly(AVG)} fill="none" stroke={dark ? "#94a3b8" : "#94a3b8"} strokeWidth="1.5" strokeDasharray="4 3" />}
      <polygon points={poly(values)} fill={fill} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      {values.map((v, i) => { const [x, y] = pt(i, v); return <circle key={i} cx={x} cy={y} r="2.6" fill={stroke} />; })}
      {labels && values.map((_, i) => {
        const a = (Math.PI * 2 * i) / n - Math.PI / 2;
        const x = c + Math.cos(a) * (R + 16), y = c + Math.sin(a) * (R + 16);
        const anchor = Math.abs(Math.cos(a)) < 0.2 ? "middle" : Math.cos(a) > 0 ? "start" : "end";
        return <text key={i} x={x} y={y + 3} textAnchor={anchor} fontSize="8.5" fontWeight="600" fill="#8791a8">{PARAMS[i].s}</text>;
      })}
    </svg>
  );
}
