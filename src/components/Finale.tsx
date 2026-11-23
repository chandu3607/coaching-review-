import Link from "next/link";
import { HOME } from "@/lib/coaching";

export function Finale() {
  return (
    <section className="py-8 sm:py-12">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-center text-white sm:px-12 sm:py-20">
          <div className="absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand-600/40 blur-3xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-3xl">{HOME.finale.title}</h2>
            <p className="mt-4 text-base text-slate-600">{HOME.finale.lede}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/submit-review" className="btn btn-primary">{HOME.finale.primaryButton}</Link>
              <Link href="/insights" className="btn btn-glass">{HOME.finale.secondaryButton}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
