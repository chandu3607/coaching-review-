import Link from "next/link";
import { site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className=" bg-ink text-slate-400">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="text-lg font-bold tracking-tight text-white">{site.name}</p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed">
            Run by {site.owner}. We use the same method for every institute, including ours. The figures are what each institute claimed as of {site.checked}, plus student reviews where we say so. The scores are not final.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <Link className="hover:text-white" href="/">Home</Link>
          <Link className="hover:text-white" href="/insights">Insights</Link>
          <Link className="hover:text-white" href="/methodology">How we score</Link>
          <Link className="hover:text-white" href="/submit-review">Submit a review</Link>
          <a className="col-span-2 hover:text-white" href={`mailto:${site.contactEmail}`}>Spotted an error? {site.contactEmail}</a>
        </nav>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {site.name}. Institute names and logos belong to their owners.
      </div>
    </footer>
  );
}
