import Link from "next/link";
import { site } from "@/config/site";

export function DisclosureBar() {
  return (
    <div className="border-b border-white/[.06] bg-ink text-[11px] text-slate-500">
      <div className="container-x flex flex-wrap items-center gap-x-4 gap-y-1 py-1.5">
        <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">Scores not final</span>
        <span>Run by {site.owner}<span className="hidden sm:inline"> · Same method for every institute, including ours · Checked {site.checked}</span></span>
        <Link href="/methodology" className="text-sky-300 underline underline-offset-2 hover:text-sky-200">How we score</Link>
      </div>
    </div>
  );
}
