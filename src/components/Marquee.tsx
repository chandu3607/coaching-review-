import Link from "next/link";
import { INST } from "@/lib/coaching";
import { Logo } from "./Logo";

export function Marquee() {
  const row = [...INST, ...INST];
  return (
    <div className="marquee-wrap relative overflow-hidden border-y border-white/[.06] bg-white/[.015] py-5 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]" aria-label="Institutes compared">
      <div className="marquee flex w-max items-center gap-14 pr-14">
        {row.map((I, i) => (
          <Link key={I.id + i} href={`/institutes/${I.id}`} tabIndex={i >= INST.length ? -1 : 0} aria-hidden={i >= INST.length} className="flex items-center gap-3 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0">
            <Logo I={I} s={26} /><span className="text-xs font-medium text-slate-500">{I.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
