import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Bento } from "@/components/Bento";
import { SectionNav } from "@/components/SectionNav";
import { Scorecard } from "@/components/Scorecard";
import { InstituteCards } from "@/components/InstituteCards";
import { Glance } from "@/components/Glance";
import { Claims } from "@/components/Claims";
import { Questions } from "@/components/Questions";
import { Voices } from "@/components/Voices";
import { FitFinder } from "@/components/FitFinder";
import { Finale } from "@/components/Finale";

const R = ({ children }: { children: React.ReactNode }) => <div className="reveal">{children}</div>;

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <SectionNav />
      <R><Bento /></R>
      <R><Scorecard /></R>
      <R><InstituteCards /></R>
      <R><Glance /></R>
      <R><Claims /></R>
      <R><Questions /></R>
      <R><Voices /></R>
      <R><FitFinder /></R>
      <R><Finale /></R>
    </>
  );
}
