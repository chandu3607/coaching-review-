import Image from "next/image";
import { LOGO_AR, type Institute } from "@/lib/coaching";

/** Institute wordmark, sized by visual weight. `s` ≈ side of an equivalent square. */
export function Logo({ I, s = 28, alt = "" }: { I: Pick<Institute, "id" | "name">; s?: number; dark?: boolean; alt?: string }) {
  const r = LOGO_AR[I.id];
  let w = s * Math.sqrt(r), h = s / Math.sqrt(r);
  const mw = s * 2;
  if (w > mw) { w = mw; h = w / r; }
  return (
    <Image
      src={`/images/logo-${I.id}-d.png`}
      alt={alt}
      width={Math.round(w)}
      height={Math.round(h)}
      className="shrink-0 object-contain"
      style={{ width: Math.round(w), height: Math.round(h) }}
    />
  );
}

/** Fixed-width slot so rows of different logos line up. */
export function LogoBox({ I, s = 26, w, dark = false }: { I: Institute; s?: number; w?: number; dark?: boolean }) {
  return (
    <span className="inline-flex shrink-0 items-center justify-start" style={{ width: w ?? Math.round(s * 2) }}>
      <Logo I={I} s={s} dark={dark} />
    </span>
  );
}

/** Logo on a soft rounded tile (used on cards and heroes). */
export function LogoTile({ I, size = 72, dark = false, alt = false }: { I: Institute; size?: number; dark?: boolean; alt?: boolean }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-2xl ${dark ? "bg-white/10 ring-1 ring-white/15" : "bg-surface ring-1 ring-slate-200 shadow-sm"}`}
      style={{ width: size, height: size }}
    >
      <Logo I={I} s={size * 0.5} dark={dark} alt={alt ? I.name : ""} />
    </span>
  );
}
