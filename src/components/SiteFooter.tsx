import Link from "next/link";
import { NAV, site, tpl } from "@/lib/coaching";

export function SiteFooter() {
  return (
    <footer className=" bg-ink text-slate-400">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="text-lg font-bold tracking-tight text-white">{site.name}</p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed">
            {tpl(site.footerAbout)}
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {NAV.footer.map((l) => <Link key={l.href} className="hover:text-white" href={l.href}>{l.label}</Link>)}
          <a className="col-span-2 hover:text-white" href={`mailto:${site.contactEmail}`}>{site.footerErrorPrefix} {site.contactEmail}</a>
        </nav>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {site.name}. {site.footerLegal}
      </div>
    </footer>
  );
}
