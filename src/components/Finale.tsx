import Link from "next/link";

export function Finale() {
  return (
    <section className="py-8 sm:py-12">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-center text-white sm:px-12 sm:py-20">
          <div className="absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand-600/40 blur-3xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-3xl">A year is too long to find out the hard way.</h2>
            <p className="mt-4 text-base text-slate-600">Check the numbers first, then choose.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/submit-review" className="btn btn-primary">Submit your review →</Link>
              <Link href="/insights" className="btn btn-glass">See all ten areas</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
