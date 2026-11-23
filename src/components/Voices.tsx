import Image from "next/image";
import Link from "next/link";
import { HOME, INST } from "@/lib/coaching";
import { LogoBox } from "./Logo";
import { SectionHeading } from "./SectionHeading";

export function Voices() {
  return (
    <section id="voices" className="scroll-mt-20 bg-surface py-14 sm:py-16">
      <div className="container-x">
        <SectionHeading n="06" eyebrow="Voices" title={HOME.voices.title} lede={HOME.voices.lede} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {INST.map((I) => (
            <Link key={I.id} href={`/institutes/${I.id}`} className="group card flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-glow">
              <div className="relative aspect-[16/9] overflow-hidden bg-ink">
                <Image src={`/images/inst-${I.id}.jpg`} alt="" fill sizes="(min-width:1280px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <span className="absolute bottom-3 left-4 rounded-lg border border-white/10 bg-ink/70 px-2 py-1 backdrop-blur"><LogoBox I={I} s={20} w={60} /></span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="font-bold tracking-tight">{I.name}</h3>
                <p className="flex gap-2.5 text-sm text-slate-700"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-xs font-bold text-emerald-300">+</span>{I.voice.p}</p>
                <p className="flex gap-2.5 text-sm text-slate-700"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-100 text-xs font-bold text-rose-300">−</span>{I.voice.m}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
